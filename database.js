const { MongoClient } = require("mongodb");
const uuid = require("uuid");
const bcrypt = require("bcrypt");
const dbConfig = require("./dbConfig.json");

const url = `mongodb+srv://${dbConfig.userName}:${dbConfig.password}@${dbConfig.hostname}`;
const client = new MongoClient(url);
const db = client.db("startup");
const userCollection = db.collection("user");
const listCollection = db.collection("list");

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
	await client.connect();
	await db.command({ ping: 1 });
})().catch((ex) => {
	console.log(
		`Unable to connect to database with ${url} because ${ex.message}`
	);
	process.exit(1);
});

function getUser(username) {
	return userCollection.findOne({ username: username });
}

function getUserByToken(token) {
	return userCollection.findOne({ token: token });
}

async function getUserLists(username) {
	const user = getUser(username);
	const listIDs = user.ownedLists.concat(user.sharedLists);
	const projection = { name: 1, creator: 1 };
	const lists = [];
	for (const listID of listIDs)
		lists.push(await listCollection.findOne({ _id: listID }, projection));
	return lists;
}

function getList(listID) {
	return listCollection.findOne({ _id: listID });
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
	const result = await userCollection.insertOne(user);
	user._id = result.insertedId;

	return user;
}

async function createList(listName, creatorUsername) {
	const list = {
		name: listName,
		creator: creatorUsername,
		items: []
	};

	try {
		const result = await listCollection.insertOne();
		list._id = result.insertedId;

		const user = await getUser(creatorUsername);
		user.ownedLists.push(list._id);
		await userCollection.updateOne({ username: creatorUsername }, user);
	} catch (e) {
		console.error(e);
	}

	return list;
}

async function addListItem(listID, task) {
	const itemIndex = null;
	
	try {
		const item = {
			task: task,
			assignee: null,
			isDone: false
		};

		const list = await getList(listID);
		itemIndex = list.items.length;
		list.items.push(item);
		await listCollection.updateOne({ _id: listID }, list);
	} catch (e) {
		console.error(e);
	}

	return itemIndex
}

async function setAssignee(listID, itemIndex, assignee) {
	try {
		const list = await getList(listID);
		list.items[itemIndex].assignee = assignee;
		await listCollection.updateOne({ _id: listID }, list);
	} catch (e) {
		console.error(e);
	}
}

async function updateItemDone(listID, itemIndex, isDone) {
	try {
		const list = await getList(listID);
		list.items[itemIndex].isDone = isDone;
		await listCollection.updateOne({ _id: listID }, list);
	} catch (e) {
		console.error(e);
	}
}

module.exports = {
	getUser,
	getUserByToken,
	createUser,
	getUserLists,
	createList,
	addListItem,
	setAssignee,
	updateItemDone
};
