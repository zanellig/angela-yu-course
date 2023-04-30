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
		name: '<-- Hit this to cross out an item.',
	});

	const item4 = new Item({
		name: 'Hit that to delete an item -->',
	});

	const defaultItems = [item1, item2, item3, item4];

	const listsSchema = new Schema({
		name: {
			type: String,
			required: [true, `The name of the list is required.`],
		},
		items: [itemsSchema],
	});

	const List = mongoose.model('List', listsSchema);

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
		const deletedId = req.body.delete;
		Item.deleteOne({ _id: deletedId }).then(
			console.log(`Item ${deletedId} deleted succesfully.`)
		);
		res.redirect('/');
	});

	app.get('/about', (req, res) => {
		// Render the about ejs page.
		res.render('about');
	});

	app.get('/:list', (req, res) => {
		// Get the requested title by the user and lower case it.
		const titleRequested = req.params.list.toLocaleLowerCase();

		// Upper case the first letter.
		const upperCasedTitle =
			titleRequested.at(0).toLocaleUpperCase() + titleRequested.slice(1);

		// Find if the list with the requested title exists in the database.
		List.findOne({ name: titleRequested }).then(list => {
			if (!list) {
				const newList = new List({
					name: titleRequested,
					items: new Item({
						name: `You've created a ${titleRequested} list!`,
					}),
				});

				newList.save();

				List.findOne({ name: titleRequested }).then(document => {
					res.render('list', {
						title: upperCasedTitle,
						items: document.items,
					});
					console.log(`${upperCasedTitle} list created succesfully.`);
				});
			} else if (list) {
				List.findOne({ name: titleRequested }).then(document => {
					res.render('list', {
						title: upperCasedTitle,
						items: document.items,
					});
				});
			}
		});
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
