// Import necessary modules
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { promisify } from 'util';
import { createPool } from 'mysql2/promise';

// Environment variables for JWT secret and database credentials
const jwtSecretKey = process.env.JWT_SECRET_KEY;

// Create a MySQL pool connection
const pool = createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'cop4710',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    console.log(user);
    next();
  });
};
// Initialize router
const router = express.Router();

// POST /login endpoint
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Query the database for the user
    const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    
    if (users.length === 0) {
      // If no user found, send a 401 Unauthorized response
      return res.status(401).send({ error: 'Invalid login credentials' });
    }
    
    const user = users[0];
    
    // Compare the hashed password
    const match = await bcrypt.compare(password, user.password);
    
    if (!match) {
      // If password does not match, send a 401 Unauthorized response
      return res.status(401).send({ error: 'Invalid login credentials' });
    }
    
    // If password matches, generate a JWT token
    const token = jwt.sign({ userId: user.user_id }, jwtSecretKey, { expiresIn: '24h' });
    
    // Send the token in the response
    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send({ error: 'An error occurred while logging in' });
  }
});

router.post('/register', async (req, res) => {
  // Extract user information from the request body
  const { user_id, password, name, phone, email, university_id, isAdmin } = req.body;

  try {
    // Check if the user already exists in the database
    const [userExists] = await pool.query('SELECT * FROM users WHERE user_id = ?', [user_id]);

    if (userExists[0]) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Hash the password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert the new user into the database
    const result = await pool.query(
      'INSERT INTO users (user_id, password, name, phone, email, university_id) VALUES (?, ?, ?, ?, ?, ?)',
      [user_id, hashedPassword, name, phone, email, university_id]
    );

    if (isAdmin) {
      await pool.query(
        `INSERT INTO admins (user_id) VALUES (?)`,
        [user_id]
      );
    }

    const BOOP = await pool.query(
      'SELECT user_id FROM users WHERE email = ?',
      [email]
    );
    const userId = BOOP[0][0].user_id;
    console.log(userId);

    if (result[0].affectedRows === 1) {
      const token = jwt.sign({ userId }, jwtSecretKey, { expiresIn: '24h' });
      return res.status(201).json({ token });
    } else {
      throw new Error('User could not be registered');
    }
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ message: 'Server error during registration' });
  }
});

router.get('/isAdmin', verifyToken, async (req, res) => {
  try {
    const user_id = req.user.userId; // Get the user ID from verified token

    // Query to check if the user is in the 'admins' table
    const result = await pool.query(`
      SELECT EXISTS (
        SELECT 1 FROM admins WHERE user_id = ?
      ) AS IsAdmin;
    `, [user_id]);

    // 'result' is expected to be an array with one object containing the IsAdmin property
    const isAdmin = result[0][0].IsAdmin == 1;

    // Send JSON response with isAdmin boolean
    res.status(200).json({ isAdmin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/id', async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, jwtSecretKey, (err, user) => {
      if (err) return res.sendStatus(403);
      res.json({ user_id: user.userId });
    });
  } catch (error) {
    console.error('User ID error:', error);
    res.status(500).json({ error: 'An error occurred while retrieving user ID' });
  }
});

export default router;
