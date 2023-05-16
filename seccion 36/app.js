'use strict';

// Setup express module
const express = require('express');
const app = express();

const port = process.env.PORT || 5000;
const root = __dirname;

const { credentials } = require(`${root}/credentials.js`);

const mongoose = require('mongoose');
const { Schema } = mongoose;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs');

main().catch(err => console.log(err));

async function main() {
	await mongoose.connect(
		`mongodb+srv://${credentials.user}:${credentials.password}@cluster0.dz2qmae.mongodb.net/wikiDB?retryWrites=true&w=majority`
	);
	const articleSchema = new Schema({
		title: { type: String, required: true },
		content: { type: String, required: true },
	});

	const Article = mongoose.model('Article', articleSchema);
	const Backup = mongoose.model('Backup', articleSchema);

	app
		.route('/articles')
		.get((req, res) => {
			Article.find({})
				.catch(err => {
					res.send(err);
				})
				.then(articles => {
					res.send(articles);
				});
		})
		.post((req, res) => {
			const sentTitle = req.body.title;
			const sentContent = req.body.content;

			Article.find({ title: sentTitle }).then(async article => {
				if (article.length === 0) {
					const newArticle = new Article({
						title: sentTitle,
						content: sentContent,
					});
					const articleBackup = new Backup({
						title: sentTitle,
						content: sentContent,
					});

					await articleBackup.save();

					await newArticle
						.save()
						.catch(err => {
							res.send(err);
						})
						.then(article => {
							res.send(article);
						});
				} else {
					res.send(`The article already exists. Consider changing the title.`);
				}
			});
		})
		.delete((req, res) => {
			let confirm = req.body.confirm;
			if (confirm) {
				confirm = confirm.toLocaleLowerCase();
				if (confirm === 'yes' || confirm === 'y') {
					Article.deleteMany({})
						.catch(err => {
							res.send(err);
						})
						.then(
							res.send({
								response: 'Deleted all articles.',
							})
						);
				} else {
					res.send(
						`Please confirm the deletion by sending a 'YES' or 'Y' string with the key 'confirm'. You've sent '${confirm}'`
					);
				}
			} else
				res.send(
					`Please confirm the deletion by sending a 'YES' or 'Y' string with the key 'confirm'.`
				);
		});

	app
		.route('/articles/:article')
		.get((req, res) => {
			Article.find({ title: req.params.article.split('_').join(' ') })
				.catch(err => res.send(err))
				.then(article => {
					console.log(article);
					if (article.length !== 0) {
						res.send({
							title: article[0].title,
							content: article[0].content,
						});
					} else {
						res.send({
							response: `Couldn't find the article requested. Check the spelling and capitalization and try again.`,
						});
					}
				});
		})
		.put((req, res) => {
			const requestedArticleTitle = req.params.article.split('_').join(' ');
			const sentTitle = req.body.title;
			const sentContent = req.body.content;
			if (sentTitle && sentContent) {
				Article.replaceOne(
					{
						title: requestedArticleTitle,
					},
					{
						title: sentTitle,
						content: sentContent,
					},
					{
						// I think it's false by default, but I write it anyways just to avoid any edge cases. In the mongoose documentation upsert's default is false.
						upsert: false,
					}
				).then(async mongoResponse => {
					if (mongoResponse.modifiedCount !== 0) {
						const backupArticle = new Backup({
							title: sentTitle,
							content: sentContent,
						});
						await backupArticle.save();

						res.send(`Replaced the ${requestedArticleTitle} document.`);
					} else {
						res.send(
							`Couldn't find an existing article with the title ${requestedArticleTitle}. Please check your spelling and try again.`
						);
					}
				});
			} else if (sentTitle) {
				res.send(`The field 'content' is required.`);
			} else {
				res.send(`The field 'title' is required.`);
			}
		})
		.patch((req, res) => {
			const requestedArticleTitle = req.params.article.split('_').join(' ');
			const sentTitle = req.body.title;
			const sentContent = req.body.content;
			// I thought to use a ternary operator but it was a headache just to think about the structure of the code I would have to use.
			// That's why we are going with if-else blocks again.
			if (sentTitle && sentContent) {
			} else if (sentTitle) {
			} else if (sentContent) {
			}
		});

	app.listen(port, () => {
		console.log(`Server started on port ${port}`);
	});
}
