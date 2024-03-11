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
	res.send(getList(req.body));
});

// addListItem
apiRouter.post('/list/item', (req, res) => {
	addListItem(req.body);
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

const port = 8080;
app.listen(port, function() {
	console.log("Listening on port ${port}");
})

let lists = [
	{
		Name: "TestList",
		ID: 0,
		Creator: "bmadsenonpc",
		Items: [{
			Task: "Example task",
			Assignee: null,
			IsDone: false
		}]
	}
];
let users = {
	bmadsenonpc: {
		OwnedLists: [0],
		SharedLists: []
	}
};

function getLists(username) {
	let userLists = []
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
	console.log(listID);
	listID = Number(listID)
	console.log(listID, lists[listID]);
	return lists[listID]
}

function addListItem(reqBody) {
	
}

function setAssignee(reqBody) {
	
}

function updateItemDone(reqBody) {

}