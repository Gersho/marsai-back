import express from 'express';
import authRouter from './routes/auth.routes.js';
import { errorHandler } from './middlewares/error-handler.js';

const app = express();
const IP = process.env.IP;
const PORT = process.env.PORT;

app.use(express.json());

app.use('/auth', authRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.info(`Server is running on ${IP}:${PORT}`);
});
