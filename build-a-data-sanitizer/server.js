import express from "express";
import { inputCleaner, inputValidator } from './middleware.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.redirect('/form');
});

app.get('/form', (req, res) => {
  res.status(200).json({ message: 'Form endpoint accessible' });
});

app.post('/submit', inputCleaner, inputValidator, (req, res) => {
  const { username, comment } = req.body;
  
  res.status(200).json({
    username: username,
    comment: comment
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});