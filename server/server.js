const express = require('express');
const app = express();

const validate = require('./logic/validate.js');
const calc = require('./logic/calc.js');

const host = 'localhost';
const port = '3000';

app.use(express.static('public'));

app.get('/calc', (req, res) => {
  if (!req.query.mathString) {
    res.status(400).send("Error: please include ?mathString= and then a string to evaluate.");
  } else {
    let mathString = req.query.mathString;
    if (mathString.length > 1024) {
      res.status(400).send("Error: Query length exceeds 1024 characters.");
    }
    const val = validate(mathString);
    if (val.outcome) {
      const answer = calc(mathString);
      console.log(answer);
      res.send({answer: answer});
    } else {
      res.status(400).send({answer: val.text });
    }
  }
});

module.exports = app;
