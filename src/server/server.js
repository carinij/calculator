const express = require('express');
const app = express();

const validateFormula = require('./validateFormula.js')

const host = 'localhost';
const port = '3000';

app.use(express.static('public'));

app.get('/calc', (req, res) => {
  if (req.query.formula.length > 1024) {
    res.status(400).send("Error: Query length exceeds 1024 characters.");
  }
  const val = validateFormula(req.query.formula);
  if (val.outcome) {
    res.send({answer: "Probably it's 5?"});
  } else {
    res.status(400).send({answer: val.text });
  }

});

app.listen(port, () => {
  console.log(`Listening at http://${host}:${port}`);
});