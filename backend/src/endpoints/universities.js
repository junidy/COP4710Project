import express from 'express';
import { promisify } from 'util';
import mysql from 'mysql2';

import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();
const db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'password',
    database: process.env.DB_NAME || 'cop4710'
});
const query = promisify(db.query).bind(db);

// Return a list of university names
router.get('/', async (req, res) => {
    try {
        const universities = await query('SELECT university_id, name FROM universities');
        const formattedResponse = universities.map(university => ({
            id: university.university_id,
            name: university.name
        }));
        res.json(formattedResponse);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;