import app from './src/server.js'
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// import express from 'express';
// const app = express();
// const port = 3000;
// import cors from 'cors';
// import fetchEvents from './src/utils/fetchEvents.js';

// app.use(cors());

// // TODO : Implement this in at the database level – periodically update the database instead of fetching here
// const events = await fetchEvents();
// // const events = await Promise.all(promisedEvents);

// events.map(event => console.log(event.title, event.location));

// app.get('/getEvents', (req, res) => {
//   res.send(events)
// });

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// });

