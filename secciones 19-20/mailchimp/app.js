const express = require('express');
const app = express();
const port = 3000;
const root = __dirname;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`public`));

const request = require('request');

const https = require('node:https');

app.get('/', (req, res) => {
	res.sendFile(`${root}/signup.html`);
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
