import express from 'express';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import mysql from 'mysql2';

import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'cop4710'
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
    res.status(401).json({ error: 'Unauthorized or invalid token' });
  }
};

// Create a new RSO
router.post('/', verifyToken, isAdmin, async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'RSO name is required' });
  }
  try {
    const decoded = jwt.verify(req.token, process.env.JWT_SECRET_KEY);
    await query('INSERT INTO rsos (name, admin_id, active) VALUES (?, ?, FALSE)', [name, decoded.userId]);
    res.status(201).json({ message: 'RSO created successfully' });
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
