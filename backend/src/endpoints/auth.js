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
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'cop4710',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

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
  const { user_id, password, name, phone, email, university_id } = req.body;

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

    if (result[0].affectedRows === 1) {
      const token = jwt.sign({ userId: user_id }, jwtSecretKey, { expiresIn: '24h' });
      return res.status(201).json({ token });
    } else {
      throw new Error('User could not be registered');
    }
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ message: 'Server error during registration' });
  }
});


export default router;
