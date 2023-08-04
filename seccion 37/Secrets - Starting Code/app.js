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

const GoogleStrategy = require('passport-google-oauth20').Strategy;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs');

app.use(
	session({
		secret: process.env.SECRET,
		resave: false,
		saveUninitialized: false,
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

	const userSchema = new Schema({
		username: { type: String },
		password: { type: String },
		googleId: { type: String },
		email: { type: String },
		provider: { type: String },
	});

	userSchema.plugin(passportLocalMongoose);
	// userSchema.plugin(findOrCreate);

	const User = mongoose.model('User', userSchema);

	passport.use(User.createStrategy());

	passport.serializeUser((user, done) => {
		done(null, user.id);
	});
	passport.deserializeUser((id, done) => {
		User.findById(id, (err, user) => {
			done(err, user);
		});
	});

	passport.use(
		new GoogleStrategy(
			{
				clientID: process.env.CLIENT_ID,
				clientSecret: process.env.CLIENT_SECRET,
				callbackURL: 'http://localhost:5000/auth/google/secrets',
			},
			(accessToken, refreshToken, profile, cb) => {
				const googleUsername = profile.displayName
					.toLocaleLowerCase()
					.replace(' ', '');
				User.findOne({ googleId: profile.id }).then(async (err, user) => {
					console.log(`Fetched user: ${user}`);
					if (err) {
						return cb(err);
					}
					if (!user) {
						const user = new User({
							provider: profile.provider,
							username: googleUsername,
							googleId: profile.id,
							email: `${googleUsername}@gmail.com`,
						});
						await user.save().catch(err => {
							console.log('Error saving user to database.');
							return cb(err);
						});
					} else {
						return cb(err, user);
					}
				});
			}
		)
	);

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
		if (req.isAuthenticated()) {
			console.log('USER AUTHENTICATED');
			res.render('secrets');
		} else {
			console.log('USER NOT AUTHENTICATED');
			res.redirect('/login');
		}
	});

	app.post('/register', (req, res) => {
		const username = req.body.username;
		const password = req.body.password;
		User.register({ username: username }, password, (err, user) => {
			if (err) {
				res.redirect('/register');
			} else {
				passport.authenticate('local', {
					failureRedirect: '/login',
				})(req, res, () => {
					res.redirect('/secrets');
				});
			}
		});
	});

	app.post('/login', async (req, res) => {
		const requestedUsername = req.body.username;
		await User.findOne({ username: requestedUsername }).then(foundUser => {
			if (foundUser) {
				console.log(foundUser.id);
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

	app.listen(port, () => {
		console.log(`Server started on port ${port}`);
	});
}
