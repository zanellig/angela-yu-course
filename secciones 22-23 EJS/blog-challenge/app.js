'use strict';

// Setup express module
const express = require('express');
const app = express();

// Setup port being 3000, if impossible (hosted on glitch F.E.) then port equals the port that the host decides.
const port = 3000 || process.env.PORT;
const root = __dirname;

const homeStartingContent =
	'Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.';
const aboutContent =
	'Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.';
const contactContent =
	'Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.';

const posts = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	res.render('home', {
		home: homeStartingContent,
		posts: posts,
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		about: aboutContent,
	});
});

app.get('/contact', (req, res) => {
	res.render('contact', {
		contact: contactContent,
	});
});

app.get('/compose', (req, res) => {
	res.render('compose');
});

app.get('/posts/:post', (req, res) => {
	const titleRequested = req.params.post;
	posts.forEach(e => {
		const title = e.title.toLowerCase().replace(' ', '-');
		if (titleRequested === title) {
			res.render('post', { title: e.title, content: e.content });
		}
	});
	res.redirect('/');
});

app.post('/', (req, res) => {
	const post = {
		title: req.body.journalTitle,
		content: req.body.journalContent,
	};
	posts.push(post);

	res.redirect('/');
});

app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
