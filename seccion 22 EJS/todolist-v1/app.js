'use strict';

// Setup express module
const express = require('express');
const app = express();
// Setup port being 3000, if impossible (hosted on glitch F.E.) then port equals the port that the host decides.
const port = 3000 || process.env.PORT;
const root = __dirname;

// Require own module that requests the current date.
const date = require(`${root}/date.js`);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs');

// Setup empty array for the items that the user inputs.
const items = [];
const workItems = [];

app.get('/', (req, res) => {
	// Render the list ejs page with the current date and the items on the array.
	res.render('list', { title: date.day, items: items });
});

app.post('/', (req, res) => {
	let item = req.body.item;
	// If the title is Work List, then it pushes the input into the workItems array and redirects to the work page.
	if (req.body.list === 'Work List') {
		workItems.push(item);
		res.redirect('/work');
	} else {
		// Otherwise pushes to the normal array.
		items.push(item);
		res.redirect('/');
	}
});

app.get('/work', (req, res) => {
	// If we go to the /work route, then render the list with the title Work List and render the items in the workItems array.
	res.render('list', { title: 'Work List', items: workItems });
});

app.get('/about', (req, res) => {
	// Render the about ejs page.
	res.render('about');
});
/*
app.post('/work', (req, res) => {
	workItems.push(item);
	res.redirect('/work');
});
*/
app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});

// Deprecated code. Kept for archiving purposes.
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
