"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const port = 3000;
const root = __dirname;

app.get("/", (req, res) => {
  res.sendFile(`${root}/index.html`);
});

app.get("/bmi-calculator", (req, res) => {
  res.sendFile(`${root}/bmiCalculator.html`);
});

app.post("/", (req, res) => {
  const num1 = Number(req.body.num1);
  const num2 = Number(req.body.num2);
  const sumResult = num1 + num2;
  res.send(`The result of the calculation is ${sumResult}.`);
});

app.post("/bmi-calculator", (req, res) => {
  const weight = Number(req.body.weight);
  const height = Number(req.body.height);
  const bmi = weight / (height * height);
  res.send(`Your BMI is ${bmi}`);
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
