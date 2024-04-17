// Import necessary libraries
import express from 'express';
import mysql from 'mysql2/promise';
import jwt from 'jsonwebtoken';

// Database connection setup
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'cop4710',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};
const pool = mysql.createPool(dbConfig);

const router = express.Router();

// Middleware to verify token and set user_id in req.user
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

// GET comments for a given event
router.get('/:eventId', async (req, res) => {
  try {
    const { eventId } = req.params;
    const query = `
      SELECT u.name, f.user_id, f.comment, f.rating, f.timestamp, f.feedback_id
      FROM feedback f
      JOIN users u ON f.user_id = u.user_id
      WHERE f.event_id = ?
      ORDER BY f.timestamp DESC;
    `;
    const [rows] = await pool.query(query, [eventId]);
    res.status(200).json({ comments: rows });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST a new comment
router.post('/', verifyToken, async (req, res) => {
  const { event_id, comment, rating } = req.body;
  const user_id = req.user.userId; // Assuming the decoded JWT is attached to the request object
  console.log(user_id);
  const insertQuery = `
    INSERT INTO feedback (event_id, user_id, comment, rating)
    VALUES (?, ?, ?, ?);
  `;
  try {
    await pool.query(insertQuery, [event_id, user_id, comment, rating]);
    res.status(200).json({ message: 'Comment added successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Failed to add comment' });
  }
});

// PUT to edit a comment
router.put('/:feedbackId', verifyToken, async (req, res) => {
  const { feedbackId } = req.params;
  const user_id = req.user.userId; // Assuming the decoded JWT is attached to the request object
  const { comment, rating } = req.body;
  const updateQuery = `
    UPDATE feedback
    SET comment = ?, rating = ?
    WHERE feedback_id = ? AND user_id = ?;
  `;
  try {
    const [result] = await pool.query(updateQuery, [comment, rating, feedbackId, user_id]);
    if (result.affectedRows) {
      res.status(200).json({ message: 'Comment updated successfully' });
    } else {
      res.status(404).json({ message: 'Comment not found or you do not have permission to edit this comment' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to update comment' });
  }
});

// DELETE a comment
router.delete('/:feedbackId', verifyToken, async (req, res) => {
  const { feedbackId } = req.params;
  const user_id = req.user.userId; // Assuming the decoded JWT is attached to the request object
  console.log(user_id, feedbackId);
  const deleteQuery = `
    DELETE FROM feedback
    WHERE feedback_id = ? AND user_id = ?;
  `;
  try {
    const [result] = await pool.query(deleteQuery, [feedbackId, user_id]);
    if (result.affectedRows) {
      res.status(200).json({ message: 'Comment deleted successfully' });
    } else {
      res.status(404).json({ message: 'Comment not found or you do not have permission to delete this comment' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete comment' });
  }
});

export default router;
