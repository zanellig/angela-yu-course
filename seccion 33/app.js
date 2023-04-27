'use strict';

// Setup express module
const express = require('express');
const app = express();
// Setup port being 3000, if impossible (hosted on glitch F.E.) then port equals the port that the host decides.
const port = 3000 || process.env.PORT;
const root = __dirname;

const mongoose = require('mongoose');
const { Schema } = mongoose;

// Require own module that requests the current date.
const date = require(`${root}/date.js`);

const day = date.getDate();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs');

main().catch(err => console.log(err));

async function main() {
	await mongoose.connect('mongodb://127.0.0.1:27017/todolistDB');

	const itemsSchema = new Schema({
		name: { type: String, required: [true, `The field name is required.`] },
	});

	const Item = mongoose.model('Item', itemsSchema);

	const item1 = new Item({
		name: 'Welcome to your todo list!',
	});

	const item2 = new Item({
		name: 'Hit  the + button to add a new item.',
	});

	const item3 = new Item({
		name: '<-- Hit this to delete an item.',
	});

	const defaultItems = [item1, item2, item3];

	// await Item.deleteMany({}).then(() => {
	// 	console.log(`Succesfully deleted all documents from the collection.`);
	// });

	app.get('/', (req, res) => {
		Item.find({}).then(items => {
			if (items.length === 0) {
				Item.insertMany(defaultItems).then(() => {
					console.log(
						`Succesfully inserted ${defaultItems.length} documents into the collection.`
					);
				});
				res.redirect('/');
			} else {
				res.render('list', {
					title: day,
					items: items,
				});
			}
		});

		// Render the list ejs page with the current date and the items on the array.
	});

	app.post('/', (req, res) => {
		const item = req.body.item;

		// Otherwise pushes to the normal array.
		const newItem = new Item({
			name: item,
		});

		newItem.save();

		res.redirect('/');
	});

	app.post('/del-item', (req, res) => {
		console.log(req.body.item);
		res.redirect('/');
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

	// mongoose.connection.close();
}

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
