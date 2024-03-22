const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const DB = require("./database.js");

app.use(cookieParser());
// JSON request body parsing using built-in middleware
app.use(express.json());

app.use(express.static("public"));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// CreateAuth token for a new user
apiRouter.post("/auth/create", async (req, res) => {
	if (await DB.getUser(req.body.username)) {
		res.status(409).send({ msg: "Existing user" });
	} else {
		const user = await DB.createUser(req.body.username, req.body.password);

		// Set the cookie
		setAuthCookie(res, user.token);

		res.send({
			id: user._id,
		});
	}
});

// GetAuth token for the provided credentials
apiRouter.post("/auth/login", async (req, res) => {
	const user = await DB.getUser(req.body.username);
	if (user) {
		if (await bcrypt.compare(req.body.password, user.password)) {
			setAuthCookie(res, user.token);
			res.send({ id: user._id });
			return;
		}
	}
	res.status(401).send({ msg: "Unauthorized" });
});

// DeleteAuth token if stored in cookie
apiRouter.delete("/auth/logout", (_req, res) => {
	res.clearCookie(authCookieName);
	res.status(204).end();
});

// getLists
apiRouter.get("/lists/:username", async (req, res) => {
	try {
		res.send(await getLists(req.params.username));
	} catch (e) {
		res.status(400).send({
			type: "bad request",
			message: "invalid username",
		});
	}
});

// getList
apiRouter.get("/list/:listID", async (req, res) => {
	try {
		res.send(await getList(req.params.listID));
	} catch (e) {
		res.status(400).send({
			type: "bad request",
			message: "invalid listID",
		});
	}
});

// addList
apiRouter.post("/list", (req, res) => {
	res.send(addList(req.body));
});

// addListItem
apiRouter.post("/list/item", (req, res) => {
	res.send(addListItem(req.body));
});

// setAssignee
apiRouter.post("/list/item/assignee", (req, res) => {
	setAssignee(req.body);
});

// updateItemDone
apiRouter.post("/list/item/done", (req, res) => {
	updateItemDone(req.body);
});

// server errors
app.use(function (err, req, res, next) {
	res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
	res.sendFile('index.html', { root: 'public' });
});

const port = 4000;
app.listen(port, function () {
	console.log(`Listening on port ${port}`);
});

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
	res.cookie(authCookieName, authToken, {
		secure: true,
		httpOnly: true,
		sameSite: "strict",
	});
}

let lists = [];
let users = {};

function getLists(username) {
	return DB.getUserLists(username);
}

function getList(listID) {
	return DB.getList(listID);
}

function getUser(username) {
	if (!(username in users)) {
		users[username] = {
			OwnedLists: [],
			SharedLists: [],
		};
	}
	return users[username];
}

function addList(reqBody) {
	const listID = lists.length;
	const list = {
		Name: reqBody.ListName,
		ID: listID,
		Creator: reqBody.Username,
		Items: [],
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
			IsDone: false,
		};
		list.Items.push(item);
		return item;
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
