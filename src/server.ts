import express from 'express';
import authRouter from './routes/auth.routes.js';
import movieRouter from './routes/movie.routes.js';

const app = express();
const PORT = process.env.PORT || 5001;

app.get('/', (_req, res) => {
  res.send('Welcome to the Express + TypeScript Server!');
});

app.use(express.json());

app.use('/auth', authRouter);

app.use('/movies', movieRouter);


app.listen(PORT, () => {
  console.info(`Server is running on http://localhost:${PORT}`);
});
