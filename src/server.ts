import express from 'express';
import db from './database/connection.js';

console.log(process.env.MYSQL_USER);
console.log(process.env.MYSQL_PASSWORD);
console.log(process.env.MYSQL_DATABASE);
const res = await db.query('DESCRIBE tag');
console.log(res[0]);

const app = express();
const PORT = process.env.PORT || 5001;

app.get('/', (_req, res) => {
  res.send('Welcome to the Express + TypeScript Server!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
