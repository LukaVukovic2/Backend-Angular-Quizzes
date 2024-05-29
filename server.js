const express = require('express');
const app = express();
require('dotenv').config( {path: `.env.${app.get('env')}`});
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const port = process.env.PORT;


const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  port: process.env.PORT,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../Angular-Quizzes/dist/Angular-Quizzes/browser')));

app.get('/api/items', (req, res) => {
  pool.query('SELECT * FROM users', (error, results) => {
    if (error) {
      return res.status(500).send(error);
    }
    res.json(results);
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../Angular-Quizzes/dist/Angular-Quizzes/browser/index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
