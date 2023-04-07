import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: 'http://localhost:3000',
  }),
);
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('Express Server');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
