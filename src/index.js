import express from 'express';
import {
  getEvent,
  getEvents,
  createEvents,
  createNotifications,
  createWeatherNotifications,
  createUsers,
  createUserEvents,
  editUser,
  getUsersEvents,
} from './controllers';
import dotenv from 'dotenv';
import { firebase } from './configs';

dotenv.config();

const app = express();

app.use(express.json());

const db = new firebase();
const PORT = process.env.PORT;

app.listen(PORT, async () => {
  console.log(`Firebase connected`);
  console.log(`Server running on port ${PORT}`);
});

app.post('/notifications', (req, res) => createNotifications(req, res, db));
app.post('/notifications/weather', (req, res) =>
  createWeatherNotifications(req, res, db)
);
app.post('/events', (req, res) => createEvents(req, res, db));
app.post('/users', (req, res) => createUsers(req, res, db));
app.put('/users', (req, res) => editUser(req, res, db));
app.post('/user-events', (req, res) => createUserEvents(req, res, db));
app.get('/events/:id', (req, res) => getEvent(req, res, db));
app.get('/user-events/:id', (req, res) => getUsersEvents(req, res, db));
app.get('/events', (req, res) => getEvents(req, res, db));
