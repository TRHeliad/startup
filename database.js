const { MongoClient } = require('mongodb');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const dbConfig = require('./dbConfig.json');

const url = `mongodb+srv://${dbConfig.userName}:${dbConfig.password}@${dbConfig.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const userCollection = db.collection('user');
const listCollection = db.collection('list');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
	await client.connect();
	await db.command({ ping: 1 });
})().catch((ex) => {
	console.log(`Unable to connect to database with ${url} because ${ex.message}`);
	process.exit(1);
});

function getUser(username) {
	return userCollection.findOne({ username: username });
}

function getUserByToken(token) {
	return userCollection.findOne({ token: token });
}


function getUserLists(username) {
	
}

function getList(listID) {
	
}

async function createUser(username, password) {
	// Hash the password before we insert it into the database
	const passwordHash = await bcrypt.hash(password, 10);

	const user = {
		username: username,
		password: passwordHash,
		ownedLists: [],
		sharedLists: [],
		token: uuid.v4(),
	};
	await userCollection.insertOne(user);

	return user;
}

function createList(listName, creatorUsername) {
	
}

function setAssignee(listID, itemIndex, assignee) {
	
}

function updateItemDone(listID, itemIndex, isDone) {
	
}

module.exports = {
	getUser,
	getUserByToken,
	createUser
};