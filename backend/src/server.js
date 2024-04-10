// src/server.js
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

// Import routers
import authRouter from './endpoints/auth.js';
// import feedbackRouter from './endpoints/feedback.js';
import rsosRouter from './endpoints/rsos.js';
import eventsRouter from './endpoints/events.js';

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Use routers
app.use('/auth', authRouter);
// app.use('/feedback', feedbackRouter);
app.use('/rsos', rsosRouter);
app.use('/events', eventsRouter);

// Catch-all route for unhandled requests
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

export default app;