'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const port = 3000;
const root = __dirname;

app.get('/', (req, res) => {
	res.sendFile(`${root}/index.html`);
});

app.post('/', (req, res) => {
	res.send(
		`The result of the calculation is ${
			Number(req.body.num1) + Number(req.body.num2)
		}.`
	);
});

app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
