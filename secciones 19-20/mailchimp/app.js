'use strict';

const express = require('express');
const app = express();
const port = 3000 || process.env.PORT;
const root = __dirname;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`public`));

const request = require('request');

const https = require('node:https');

const apiData = require('./apiData.js');
const dataCenter = apiData.dataCenter;
const apiKey = apiData.apiKey;
const audienceID = apiData.audienceID;

app.get('/', (req, res) => {
	res.sendFile(`${root}/signup.html`);
});

app.post('/', (req, res) => {
	const name = req.body.inputName;
	const surname = req.body.inputSurname;
	const email = req.body.inputEmail;

	const data = {
		members: [
			{
				email_address: email,
				status: 'subscribed',
				merge_fields: {
					FNAME: name,
					LNAME: surname,
				},
			},
		],
	};
	const jsonData = JSON.stringify(data);

	const url = `https://${dataCenter}.api.mailchimp.com/3.0/lists/${audienceID}`;

	const options = {
		method: 'POST',
		auth: `gonza1390:${apiKey}`,
	};

	const request = https.request(url, options, response => {
		if (response.statusCode === 200) {
			res.sendFile(`${root}/success.html`);
		} else {
			res.sendFile(`${root}/failure.html`);
		}
		response.on('data', data => {
			console.log(JSON.parse(data));
		});
	});

	request.write(jsonData);
	request.end();
});

app.post('/failure', (req, res) => {
	res.redirect('/');
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
