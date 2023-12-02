import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Define routes and middleware here

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
