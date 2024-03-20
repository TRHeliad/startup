const { MongoClient } = require('mongodb');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const express = require('express')
const app = express();

// JSON request body parsing using built-in middleware
app.use(express.json());

app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// getLists
apiRouter.get('/lists/:username', (req, res) => {
	const userLists = getLists(req.params.username);
	if (userLists === -1)
		res.status(400).send({type: "bad request", message: "invalid username"})
	else
		res.send(userLists);
});

// getList
apiRouter.get('/list/:listID', (req, res) => {
	res.send(getList(req.params.listID));
});

// addList
apiRouter.post('/list', (req, res) => {
	res.send(addList(req.body));
});

// addListItem
apiRouter.post('/list/item', (req, res) => {
	res.send(addListItem(req.body));
});

// setAssignee
apiRouter.post('/list/item/assignee', (req, res) => {
	setAssignee(req.body);
});

// updateItemDone
apiRouter.post('/list/item/done', (req, res) => {
	updateItemDone(req.body);
});

// server errors
app.use(function (err, req, res, next) {
	res.status(500).send({type: err.name, message: err.message});
});

const port = 4000;
app.listen(port, function() {
	console.log(`Listening on port ${port}`);
});

let lists = [];
let users = {};

function getLists(username) {
	let userLists = [];
	if (username in users) {
		const listIDs = users[username].OwnedLists.concat(users[username].SharedLists);
		for (const listID of listIDs) {
			const list = Object.assign({}, lists[listID]);
			delete list.Items;
			userLists.push(list);
		}
		return userLists;
	} else
		return -1;
}

function getList(listID) {
	listID = Number(listID);
	return lists[listID];
}

function getUser(username) {
	if (!(username in users)) {
		users[username] = {
			OwnedLists: [],
			SharedLists: []
		}
	}
	return users[username];
}

function addList(reqBody) {
	const listID = lists.length;
	const list = {
		Name: reqBody.ListName,
		ID: listID,
		Creator: reqBody.Username,
		Items: []
	};
	lists.push(list);
	const user = getUser(reqBody.Username);
	user.OwnedLists.push(listID);
	return list;
}

function addListItem(reqBody) {
	const list = lists[Number(reqBody.ListID)];
	if (list) {
		const item = {
			Task: reqBody.Task,
			Assignee: null,
			IsDone: false
		}
		list.Items.push(item);
		return item
	}
	return null;
}

function setAssignee(reqBody) {
	const list = lists[Number(reqBody.ListID)];
	if (list) {
		const item = list.Items[Number(reqBody.ItemIndex)];
		item.Assignee = reqBody.Assignee;
	}
}

function updateItemDone(reqBody) {
	const list = lists[Number(reqBody.ListID)];
	if (list) {
		const item = list.Items[Number(reqBody.ItemIndex)];
		item.IsDone = reqBody.IsDone;
	}
}