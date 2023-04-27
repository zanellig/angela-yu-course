const mongoose = require('mongoose');

const { Schema } = mongoose;

main().catch(err => console.log(err));

async function main() {
	await mongoose.connect('mongodb://127.0.0.1:27017/fruitsDB');

	const fruitsSchema = new Schema({
		name: {
			type: String,
			required: [false, 'The name of the fruit is required!'],
		},
		rating: {
			type: Number,
			required: true,
			min: [1, 'Enter a value greater than 0.'],
			max: [10, 'Enter a value between 1 and 10.'],
		},
		review: String,
	});

	const Fruit = mongoose.model('Fruit', fruitsSchema);

	const pineapple = new Fruit({
		name: 'Pineapple',
		rating: 8,
		review: 'Good',
	});

	const mango = new Fruit({
		name: 'Mango',
		rating: 6,
		review: 'Pretty decent fruit.',
	});

	const personSchema = new Schema({
		name: String,
		age: Number,
		favouriteFruit: fruitsSchema,
	});

	const Person = mongoose.model('Person', personSchema);

	const john = new Person({
		name: 'John',
		age: 37,
	});

	const amy = new Person({
		name: 'Amy',
		age: 12,
		favouriteFruit: pineapple,
	});

	// await Fruit.deleteOne({ _id: '644420a287b7a02c6966bf87' });
	// await Person.deleteOne({ _id: '644420f8bce5ba63105e8e14' });

	// Throws a fatal error, as the field name is required and the value of rating is not in the range specified.

	const orange = new Fruit({
		name: 'Orange',
		rating: 5,
		review: `Too sour, but tasty.`,
	});

	const pear = new Fruit({
		name: 'Pear',
		rating: 9,
		review: `Excellent summer fruit!`,
	});

	await Person.find().then(people => {
		people.forEach(person => {
			console.log(person);
		});
	});

	// Model methods no longer accept callbacks, so use .then() instead.
	await Fruit.find().then(fruits => {
		if (fruits) {
			fruits.forEach(function (fruit) {
				console.log(fruit);
			});
		}
	});
	mongoose.connection.close();
}

/* From the docs
import mongoose from 'mongoose';

const { Schema } = mongoose;

const blogSchema = new Schema({
	title: String,
	author: String,
	body: String,
	comments: [{ body: String, date: Date }],
	date: { type: Date, default: Date.now },
	hidden: Boolean,
	meta: {
		votes: Number,
		favs: Number,
	},
});

// We compile the schema into a Model that we can work with.
const Blog = mongoose.model('Blog', blogSchema);
*/
/* Quick start
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
	await mongoose.connect('mongodb://127.0.0.1:27017/test');

	const kittySchema = new mongoose.Schema({
		_id: Number,
		name: String,
	});

	// Methods must be added to the schema before compiling it with mongoose.model()
	kittySchema.methods.speak = function speak() {
		const greeting = this.name
			? `Meow name is ${this.name}`
			: `I don't have a name`;

		console.log(greeting);
	};

	const Kitten = mongoose.model('Kitten', kittySchema);

	const silence = new Kitten({
		_id: 1,
		name: 'Silence',
	});

	const fluffy = new Kitten({
		_id: 2,
		name: 'Fluffy',
	});

	await silence.save();
	await fluffy.save();

	console.log(silence.name);

	fluffy.speak();

	const kittens = await Kitten.find({ name: /^fluff/ });

	console.log(kittens);
}
*/
