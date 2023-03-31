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

app.set('view engine', 'ejs');

const today = new Date();
const options = { weekday: 'long', day: 'numeric', month: 'long' };
const day = today.toLocaleString('en-US', options);

let items = [];

app.get('/', (req, res) => {
	res.render('list', { day: day, items: items });
});

app.post('/', (req, res) => {
	items.push(req.body.newItem);
	res.redirect('/');
});

app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});

/*
	for (let i = 0; i < days.length; i++) {
		if (currentDay === i) {
			day = days[i];
			console.log(day);
			break;
		} else continue;
	}
    */

/*
const days = [
		'Sunday',
		'Monday',
		'Thursday',
		'Wednesday',
		'Tuesday',
		'Friday',
		'Saturday',
	];

	day = days[currentDay];
*/
