import express from 'express'
import { mongoInitialize } from './db';
import { createNotification } from './controllers/notification';

const app = express()

app.use(express.json());


const PORT = 8080
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT  }`)
});

app.post('/notification', async (req, res) => {
  if (!Object.keys(req.body).length) {
    res.status(400).json({
    message: 'Request body cannot be empty'
  })
  }
  const { title, description, read, eventId, sendAt } = req.body;

  const notification = await createNotification({ title, description, read, eventId, sendAt })
  console.log('notification', notification);
  
  if(notification.success) {
    console.log('data', notification.data);
    res.status(201).json(notification.data)
  } else {
    res.status(400).json({message: notification.message})
  }
});
