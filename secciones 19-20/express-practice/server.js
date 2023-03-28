"use strict";

const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("<h1>Hello world.</h1>");
});

app.get("/contact", (req, res) => {
  res.send("<h1>gonzalozanelli1@gmail.com</h1>");
});

app.get("/about", (req, res) => {
  res.send(`<h1>I'm a web dev.</h1>`);
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
