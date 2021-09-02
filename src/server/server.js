const express = require('express');
const app = express();

const host = 'localhost';
const port = '3000';

app.use(express.static('public'));

app.get('/calc', (req, res) => {
  if (req.query.formula.length > 1024) {
    res.status(400).send("Error: Query length exceeds 1024 characters.");
  }
  console.log(req.query.formula);
  res.send({answer: "Probably it's 5?"});
});

app.listen(port, () => {
  console.log(`Listening at http://${host}:${port}`);
});