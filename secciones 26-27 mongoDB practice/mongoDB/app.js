const { MongoClient } = require('mongodb');
const express = require('express');
const { UUID } = require('bson');

const uri = 'mongodb://127.0.0.1:27017';

const client = new MongoClient(uri, {
	pkFactory: { createPk: () => new UUID().toBinary() },
});

async function run() {
	try {
		await client.connect();

		await client.db('admin').command({ ping: 1 });
		console.log('Pinged deployment. Successfully connected to MongoDB.');

		const myDB = client.db('myDB');

		const myColl = myDB.collection('pizzaMenu');

		const docs = [
			{
				name: 'Sicilian pizza',
				shape: 'square',
			},
			{
				name: 'New York pizza',
				shape: 'round',
			},
			{
				name: 'Grandma pizza',
				shape: 'square',
			},
		];
		const insertManyresult = await myColl.insertMany(docs);
		let ids = insertManyresult.insertedIds;

		console.log(`${insertManyresult.insertedCount} documents were inserted.`);
		for (let id of Object.values(ids)) {
			console.log(`Inserted a document with id ${id}`);
		}
	} catch (e) {
		console.log(
			`A MongoBulkWriteException occurred, but there are successfully processed documents.`
		);
		let ids = e.result.result.insertedIds;
		for (let id of Object.values(ids)) {
			console.log(`Processed a document with id ${id._id}`);
		}
		console.log(`Number of documents inserted: ${e.result.result.nInserted}`);
	} finally {
		await client.close();
	}
}

run().catch(console.dir);
