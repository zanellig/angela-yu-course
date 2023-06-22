'use strict';

require('dotenv').config();

// Setup express module
const express = require('express');
const app = express();

const port = process.env.PORT || 5000;
const root = __dirname;

// const { credentials } = require(`${root}/credentials.js`);

const mongoose = require('mongoose');
const { Schema } = mongoose;

const bcrypt = require('bcrypt');
const saltRounds = 15;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs');

main().catch(err => console.log(err));

async function main() {
	await mongoose.connect(
		`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.dz2qmae.mongodb.net/secretsDB?retryWrites=true&w=majority`
	);

	const userSchema = new Schema({
		email: { type: String, required: true },
		password: { type: String, required: true },
	});

	const User = mongoose.model('User', userSchema);

	app.get('/', (req, res) => {
		res.render('home');
	});

	app.get('/login', (req, res) => {
		res.render('login');
	});

	app.get('/register', (req, res) => {
		res.render('register');
	});

	app.post('/register', (req, res) => {
		const emailInput = req.body.username;
		const passwordInput = req.body.password;

		bcrypt.hash(passwordInput, saltRounds, async function (err, hash) {
			const newUser = new User({
				email: emailInput,
				password: hash,
			});
			await User.findOne({ email: emailInput }).then(foundUser => {
				if (!foundUser) {
					newUser
						.save()
						.catch(err => {
							console.log(err);
						})
						.then(() => {
							res.render('secrets');
						});
				} else {
					console.log(
						`The user already exists. Please login with your current password.`
					);
					res.redirect('register');
				}
			});
		});
	});

	app.post('/login', (req, res) => {
		const emailInput = req.body.username;
		const passwordInput = req.body.password;

		User.findOne({ email: emailInput }).then(foundUser => {
			bcrypt.compare(passwordInput, foundUser.password, function (err, result) {
				if (result) {
					res.render('secrets');
				} else {
					console.log(`The username or password is incorrect.`);
					res.redirect('login');
				}
			});
		});
	});

	app.get('/logout', (req, res) => {
		res.render('home');
	});

	app.listen(port, () => {
		console.log(`Server started on port ${port}`);
	});
}
