expressStaticGzip = require("express-static-gzip");
const cors = require('cors');

const express = require("express");
const app = express();

const validate = require("./logic/validate.js");
const calc = require("./logic/calc.js");

const host = "localhost";
const port = "3000";

app.use(
  expressStaticGzip("public", {
    enableBrotli: true,
    orderPreference: ["br", "gz"],
    setHeaders: function (res, path) {
      res.setHeader("Cache-Control", "public, max-age=31536000");
    },
  })
);

app.use(cors({
  origin: 'http://54.193.244.117'
}));

app.get("/calc", (req, res) => {
  if (!req.query.expression) {
    res
      .status(400)
      .send(
        "Error: please include ?expression= and then a string to evaluate."
      );
  } else {
    let mathString = req.query.expression;
    if (mathString.length > 1024) {
      res.status(400).send("Error: Query length exceeds 1024 characters.");
    }
    const val = validate(mathString);
    if (val.outcome) {
      const answer = calc(mathString);
      res.send({ answer: answer });
    } else {
      res.status(400).send({ answer: val.text });
    }
  }
});

module.exports = app;
