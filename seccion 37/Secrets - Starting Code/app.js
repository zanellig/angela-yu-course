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

// const findOrCreate = require('mongoose-findorcreate'); //I DON'T LIKE THIS APPROACH

// const bcrypt = require('bcrypt');
// const saltRounds = 15;

const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const { render } = require('ejs');

const GoogleStrategy = require('passport-google-oauth20').Strategy;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs');

app.use(
	session({
		secret: process.env.SECRET,
		resave: false,
		saveUninitialized: true,
		cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 },
	})
);

app.use(passport.initialize());
app.use(passport.session());

main().catch(err => console.log(err));

async function main() {
	await mongoose.connect(
		`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.dz2qmae.mongodb.net/secretsDB?retryWrites=true&w=majority`
	);

	const secretSchema = new Schema({
		content: { type: String, required: true },
	});

	const Secret = mongoose.model('Secret', secretSchema);

	const boilerplateSecret = 'Your first secret will appear here!';

	const userSchema = new Schema({
		username: { type: String, required: true },
		password: { type: String },
		id: { type: String },
		email: { type: String },
		provider: { type: String, required: true },
		secrets: { type: Array },
	});

	userSchema.plugin(passportLocalMongoose);
	// userSchema.plugin(findOrCreate);

	const User = mongoose.model('User', userSchema);

	passport.use(User.createStrategy());

	passport.serializeUser(function (user, cb) {
		process.nextTick(function () {
			return cb(null, user.id || user.username);
		});
	});

	passport.deserializeUser(async function (idOrUser, cb) {
		await User.findOne({ id: idOrUser })
			.catch(err => {
				return cb(err);
			})
			.then(user => {
				if (!user) {
					User.findOne({ username: idOrUser })
						.catch(err => {
							return cb(err);
						})
						.then(user => {
							return cb(null, user);
						});
				} else {
					return cb(null, user);
				}
			});
	});

	passport.use(
		new GoogleStrategy(
			{
				clientID: process.env.CLIENT_ID,
				clientSecret: process.env.CLIENT_SECRET,
				callbackURL: 'http://localhost:5000/auth/google/secrets',
			},
			async (accessToken, refreshToken, profile, cb) => {
				const googleUsername = profile.displayName
					.toLocaleLowerCase()
					.replace(' ', '');

				await User.findOne({ id: profile.id }).then(async (user, err) => {
					if (err) {
						return cb(err);
					}
					if (!user) {
						console.log(
							`Couldn't fetch user, creating new one with id: ${profile.id}`
						);
						const user = new User({
							provider: profile.provider,
							username: googleUsername,
							id: profile.id,
							secrets: [],
						});
						await user
							.save()
							.catch(err => {
								if (err) {
									console.log('Error saving user to database.');
									return cb(err);
								} else {
									console.log(`Saved user to database with id: ${user.id}`);
								}
							})
							.then(user => {
								console.log(`Fetched user: ${user}`);
								return cb(err, user);
							});
					} else {
						console.log(`Fetched user: ${user}`);
						return cb(err, user);
					}
				});
			}
		)
	);

	function checkAuthAndRedirect(req, res, success, data) {
		if (req.isAuthenticated()) {
			if (data) {
				res.render(`${success}`, { data: data });
			} else {
				res.render(`${success}`);
			}
		} else {
			res.redirect(`/login`);
		}
		return;
	}

	app.get('/', (req, res) => {
		res.render('home');
	});

	app.get('/login', (req, res) => {
		res.render('login');
	});

	app.get('/register', (req, res) => {
		res.render('register');
	});

	app.get('/secrets', (req, res) => {
		Secret.find().then(secrets => {
			checkAuthAndRedirect(req, res, 'secrets', secrets);
		});
	});

	app.post('/register', (req, res) => {
		const username = req.body.username;
		const password = req.body.password;
		User.register(
			{
				username: username,
				provider: `local`,
				secrets: [],
			},
			password,
			(err, user) => {
				if (err) {
					res.redirect('/register');
				} else {
					passport.authenticate('local', {
						failureRedirect: '/login',
					})(req, res, () => {
						res.redirect('/secrets');
					});
				}
			}
		);
	});

	app.post('/login', async (req, res) => {
		const requestedUsername = req.body.username;
		await User.findOne({ username: requestedUsername }).then(foundUser => {
			if (foundUser) {
				passport.authenticate('local', {
					failureRedirect: '/login',
				})(req, res, () => {
					res.redirect('/secrets');
				});
			} else if (!foundUser) {
				console.log('Unsuccessful login.');
				res.redirect('/login');
			}
		});
	});

	app.get(
		'/auth/google/',
		passport.authenticate('google', { scope: ['profile'] })
	);

	app.get(
		'/auth/google/secrets',
		passport.authenticate('google', {
			failureRedirect: '/login',
		}),
		(req, res) => {
			res.redirect('/secrets');
		}
	);

	app.get('/logout', (req, res, next) => {
		req.logout(err => {
			if (err) {
				return next(err);
			}
			res.redirect('/');
		});
	});

	app.get('/submit', (req, res) => {
		checkAuthAndRedirect(req, res, 'submit');
	});

	app.post('/submit', (req, res) => {
		if (!req.isAuthenticated()) {
			res.redirect('/login');
		} else {
			const secret = req.body.secret;

			const newSecret = new Secret({
				content: secret,
			});

			const currentUser = req['user'];

			if (currentUser.id) {
				User.findOneAndUpdate(
					{ id: req['user'].id },
					{ $push: { secrets: newSecret } }
				)
					.catch(err => {
						console.log(err);
					})
					.then(async () => {
						await newSecret.save();
						res.redirect('/secrets');
					});
			} else if (currentUser.username) {
				User.findOneAndUpdate(
					{
						username: currentUser.username,
					},
					{ $push: { secrets: newSecret } }
				)
					.catch(err => {
						console.log(err);
					})
					.then(async () => {
						await newSecret.save();
						res.redirect('/secrets');
					});
			}
		}
	});

	app.listen(port, () => {
		console.log(`Server started on port ${port}`);
	});
}
