// events.js
import express from 'express';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import mysql from 'mysql2';
import date from 'date-and-time';
import day_of_week from 'date-and-time/plugin/day-of-week';
date.plugin(day_of_week);

// Load environment variables
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

router.get('/', verifyToken, async (req, res) => {
  try {
    const user_id = req.user.userId;
    
    // Assuming events are directly related to a user (adjust SQL as needed)
    const events = await query(`
      SELECT DISTINCT e.* 
      FROM events e
      LEFT JOIN private_events pe ON e.event_id = pe.event_id
      LEFT JOIN rso_events re ON e.event_id = re.event_id
      LEFT JOIN rso_members rm ON re.rso_id = rm.rso_id
      INNER JOIN users u ON u.user_id = ?
      LEFT JOIN super_admins sa ON u.user_id = sa.user_id
      WHERE sa.user_id IS NULL 
        AND (
          e.event_id IN (SELECT event_id FROM public_events)
          OR 
          (pe.university_id = u.university_id AND pe.university_id IS NOT NULL)
          OR 
          (rm.member_id = u.user_id AND rm.member_id IS NOT NULL)
        )
    `, [user_id]);
    
    const response = {
      events: events.map(event => ({
        ...event,
        tags: JSON.parse(event.tags) // Assuming tags are stored as JSON strings
      }))
    };
    
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', verifyToken, async (req, res) => {
  const { tags, title, category, description, start_time, end_time, location_id, contact_name, contact_email, contact_phone } = req.body;
  const creator_id = req.user.userId; // Extracted from JWT after verification

  if (!title || !description || !start_time || !end_time || !location_id || !contact_name || !contact_email || !contact_phone) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const tagsString = JSON.stringify(tags); // Assuming tags are to be stored as a string
    const startString = date.transform(start_time, 'ddd, DD MMM YYYY HH:mm:ss Z', 'DD MM YYYY HH mm ss');
    const endString = date.transform(end_time, 'ddd, DD MMM YYYY HH:mm:ss Z', 'DD MM YYYY HH mm ss');

    await query(`
      INSERT INTO events (creator_id, tags, title, category, description, start_time, end_time, location_id, contact_name, contact_email, contact_phone)
      VALUES (?, ?, ?, ?, ?, STR_TO_DATE(?, '%d %m %Y %H %i %S'), STR_TO_DATE(?, '%d %m %Y %H %i %S'), ?, ?, ?, ?)
    `, [creator_id, tagsString, title, category, description, startString, endString, location_id, contact_name, contact_email, contact_phone]);

    res.status(201).send({ message: 'Event created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
