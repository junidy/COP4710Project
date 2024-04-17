import express from 'express';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import mysql from 'mysql2';

import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();
const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'cop4710'
});
const query = promisify(db.query).bind(db);

// Middleware to verify JWT Token
const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(' ')[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403); // Forbidden
  }
};

// Middleware to check if user is an admin
const isAdmin = async (req, res, next) => {
  try {
    const decoded = jwt.verify(req.token, process.env.JWT_SECRET_KEY);
    const adminCheck = await query('SELECT * FROM admins WHERE user_id = ?', [decoded.userId]);
    if (adminCheck.length > 0) {
      next();
    } else {
      res.status(403).json({ error: 'User is not an admin' });
    }
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      console.error("Token expired");
    } else if (error instanceof jwt.JsonWebTokenError) {
      console.error("Unauthorized or invalid token");
    }

    res.status(401).json({ error: 'Unauthorized or invalid token' });
  }
};

router.get('/', verifyToken, async (req, res) => {
  const userId = jwt.verify(req.token, process.env.JWT_SECRET_KEY).userId;
  try {

      // First, get the user's university_id
      const users = await query(`
          SELECT university_id FROM users WHERE user_id = ?
      `, [userId]);

      if (users.length === 0) {
          res.status(404).json({ message: "User not found" });
          //await conn.end();
          return;
      }

      const universityId = users[0].university_id;

      // Next, fetch all RSOs from the user's university and whether the user is a member
      const rsos = await query(`
          SELECT rsos.rso_id, rsos.name,
                 EXISTS(SELECT 1 FROM rso_members WHERE rso_members.rso_id = rsos.rso_id AND rso_members.member_id = ?) AS is_member
          FROM rsos
          WHERE EXISTS (SELECT 1 FROM users WHERE users.user_id = rsos.admin_id AND users.university_id = ?)
      `, [userId, universityId]);

      // Format the response as JSON
      const formattedRsos = rsos.map(rso => ({
          rso_id: rso.rso_id,
          name: rso.name,
          is_member: !!rso.is_member // convert the number to a boolean
      }));

      res.json(formattedRsos);
  } catch (error) {
      console.error('Failed to query RSOs:', error);
      res.status(500).json({ message: "Failed to retrieve RSO information" });
  }
});


// Create a new RSO
router.post('/', verifyToken, isAdmin, async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'RSO name is required' });
  }
  try {
    const decoded = jwt.verify(req.token, process.env.JWT_SECRET_KEY);
    await query('INSERT INTO rsos (name, admin_id, active) VALUES (?, ?, FALSE)', [name, decoded.userId]);
    const clubID = await query('SELECT rso_id FROM rsos WHERE admin_id = ? AND name = ?', [decoded.userId, name]);
    res.status(201).json({
      message: 'RSO created successfully',
      clubID: clubID[0].rso_id
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Join an RSO
router.post('/:rsoId/join', verifyToken, async (req, res) => {
  const rsoId = req.params.rsoId;
  const userId = jwt.verify(req.token, process.env.JWT_SECRET_KEY).userId;
  try {
    await query('INSERT INTO rso_members (member_id, rso_id) VALUES (?, ?)', [userId, rsoId]);
    res.status(201).json({ message: 'Successfully joined RSO' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Leave an RSO
router.post('/:rsoId/leave', verifyToken, async (req, res) => {
  const rsoId = +req.params.rsoId;
  const userId = jwt.verify(req.token, process.env.JWT_SECRET_KEY).userId;
  try {
    await query("DELETE FROM rso_members WHERE `member_id` = ? AND rso_id = ?", [userId, rsoId]);
    res.status(201).json({ message: 'Successfully left RSO' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
