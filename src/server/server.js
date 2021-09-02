const express = require('express');
const app = express();

const validateFormula = require('./validateFormula.js');
const calc = require('./calc.js');

const host = 'localhost';
const port = '3000';

app.use(express.static('public'));

app.get('/calc', (req, res) => {
  let formula = req.query.formula;
  if (formula.length > 1024) {
    res.status(400).send("Error: Query length exceeds 1024 characters.");
  }
  const val = validateFormula(formula);
  if (val.outcome) {
    const answer = calc(formula);
    res.send({answer: answer});
  } else {
    res.status(400).send({answer: val.text });
  }

});

app.listen(port, () => {
  console.log(`Listening at http://${host}:${port}`);
});