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
	// Connects to my local database
	// await mongoose.connect('mongodb://127.0.0.1:27017/todolistDB');

	// Connects to Atlas
	await mongoose.connect(
		`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.dz2qmae.mongodb.net/todolistDB?retryWrites=true`
	);

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

	app.get('/', async (req, res) => {
		// When we go to the home route, we search for all item documents and if there's none, we insert the default items.
		await Item.find({}).then(async items => {
			if (items.length === 0) {
				await Item.insertMany(defaultItems).then(() => {
					console.log(
						`Succesfully inserted ${defaultItems.length} documents into the collection.`
					);
				});
				res.redirect('/');
			} else {
				await List.find({}).then(lists => {
					if (lists.length !== 0) {
						res.render('list', {
							// value="<%= title %>"
							title: day,
							items: items,
							lists: lists,
						});
					} else {
						res.render('list', {
							// value="<%= title %>"
							title: day,
							items: items,
							lists: [],
						});
					}
				});
				// Shows the main site with the items array found in the database.
			}
		});
	});

	app.post('/', async (req, res) => {
		// We take the input from the site and create a new item document.
		const item = req.body.item;

		const newItem = new Item({
			name: item,
		});

		// This takes the value from the submit button.
		const list = req.body.list.toLocaleLowerCase();

		// We lower-case it so it matches everytime.
		if (list === day.toLocaleLowerCase()) {
			// If the input from the user comes from the home route (the default DAY list), then we save the item document and refresh.
			await newItem.save();
			res.redirect('/');
		} else {
			// If the query comes from a custom list, then it looks for the list that matches the name and pushes the input into the existing embedded document array.
			await List.findOne({ name: list }).then(async foundList => {
				foundList.items.push(newItem);
				await foundList.save();
				res.redirect(`/${list}`);
			});
		}
	});

	app.post('/del-item', async (req, res) => {
		// Get the id from the value on the submit button (_id of the document).
		const deletedId = req.body.delete;

		// Get the value from the hidden input (title of the list).
		const list = req.body.list.toLocaleLowerCase();

		// Same as before, if the list is the one on the home route, we just look in the items collection for the _id and delete it.
		if (list === day.toLocaleLowerCase()) {
			await Item.deleteOne({ _id: deletedId }).then(
				console.log(`Item ${deletedId} deleted succesfully.`)
			);
			res.redirect('/');
		} else {
			// If it comes from a custom list, then we try to match the name of the list and use the mongoDB $pull operator to match the _id in the items array with the one that came from the value of the button.
			await List.findOneAndUpdate(
				{ name: list },
				{ $pull: { items: { _id: deletedId } } }
			).then(res.redirect(`/${list}`));
			// We then redirect the user to the same list that the query came from.
		}
	});

	app.get('/about', (req, res) => {
		// Render the about ejs page.
		res.render('about');
	});

	app.get('/:list', async (req, res) => {
		// Get the requested title by the user and lower case it so it does not matter how the user spelled it.
		const titleRequested = req.params.list.toLocaleLowerCase();

		// Upper case the first letter.
		let upperCasedTitle =
			titleRequested.at(0).toLocaleUpperCase() + titleRequested.slice(1);

		// Find if the list with the requested title exists in the database.
		await List.findOne({ name: titleRequested }).then(async list => {
			if (!list) {
				// If it doesn't, we create a list and embed an item document to it.
				const newList = new List({
					name: titleRequested,
					items: new Item({
						name: `You've created a ${titleRequested} list!`,
					}),
				});

				await newList.save();

				// We wait for the list to be saved in the DB, and then we search for it and render the site with the title and items of the document found.
				await List.findOne({ name: titleRequested }).then(async document => {
					await List.find({}).then(lists => {
						res.render('list', {
							// De aca sale el value="<%= title %>"
							title: upperCasedTitle,
							items: document.items,
							lists: lists,
						});
					});

					console.log(`${upperCasedTitle} list created succesfully.`);
				});
			} else if (list) {
				// If it already exists, it just finds it and displays the items in the document.
				await List.findOne({ name: titleRequested }).then(async document => {
					await List.find({}).then(lists => {
						res.render('list', {
							// De aca sale el value="<%= title %>"
							title: upperCasedTitle,
							items: document.items,
							lists: lists,
						});
					});
				});
			}
		});
	});

	app.post('/new-list', (req, res) => {
		res.redirect(`/${req.body.site}`);
	});

	app.post('/sel-list', (req, res) => {
		res.redirect(`${req.body.site}`);
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
