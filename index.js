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

// createList
apiRouter.post("/list", async (req, res) => {
	try {
		res.send(await createList(req.body));
	} catch (e) {
		res.status(400).send({
			type: "bad request",
			message: "invalid parameters",
		});
	}
});

// addListItem
apiRouter.post("/list/item", async (req, res) => {
	try {
		res.send(await addListItem(req.body));
	} catch (e) {
		res.status(400).send({
			type: "bad request",
			message: "invalid parameters",
		});
	}
});

// setAssignee
apiRouter.post("/list/item/assignee", async (req, res) => {
	try {
		await setAssignee(req.body);
	} catch (e) {
		res.status(400).send({
			type: "bad request",
			message: "invalid parameters",
		});
	}
});

// updateItemDone
apiRouter.post("/list/item/done", async (req, res) => {
	try {
		await updateItemDone(req.body);;
	} catch (e) {
		res.status(400).send({
			type: "bad request",
			message: "invalid parameters",
		});
	}
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

function createList(reqBody) {
	return DB.createList(reqBody.ListName, reqBody.Username);
}

function addListItem(reqBody) {
	return DB.addListItem(reqBody.ListID, reqBody.Task);
}

function setAssignee(reqBody) {
	return DB.setAssignee(reqBody.ListID, reqBody.ItemIndex, reqBody.Assignee);
}

function updateItemDone(reqBody) {
	return DB.updateItemDone(reqBody.ListID, reqBody.ItemIndex, reqBody.IsDone);
}
