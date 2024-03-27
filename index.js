const cookieParser = require("cookie-parser");
const express = require("express");
const bcrypt = require("bcrypt");
const app = express();
const DB = require("./database.js");

const authCookieName = 'token';

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

var secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
	authToken = req.cookies[authCookieName];
	const user = await DB.getUserByToken(authToken);
	if (user) {
		next();
	} else {
		res.status(401).send({ msg: "Unauthorized" });
	}
});

// getLists
secureApiRouter.get("/lists/:username", async (req, res) => {
	try {
		res.send(await DB.getUserLists(req.params.username));
	} catch (e) {
		res.status(400).send({
			type: "bad request",
			message: "invalid username",
		});
	}
});

// getList
secureApiRouter.get("/list/:listID", async (req, res) => {
	try {
		res.send(await DB.getList(req.params.listID));
	} catch (e) {
		res.status(400).send({
			type: "bad request",
			message: "invalid listID",
		});
	}
});

// createList
secureApiRouter.post("/list", async (req, res) => {
	try {
		res.send(await DB.createList(req.body.ListName, req.body.Username));
	} catch (e) {
		res.status(400).send({
			type: "bad request",
			message: "invalid parameters",
		});
	}
});

// addListItem
secureApiRouter.post("/list/item", async (req, res) => {
	try {
		res.send(await DB.addListItem(req.body.ListID, req.body.Task));
	} catch (e) {
		res.status(400).send({
			type: "bad request",
			message: "invalid parameters",
		});
	}
});

// shareList
secureApiRouter.post("/list/share", async (req, res) => {
	try {
		const [success, message] = await DB.shareList(req.body.ListID, req.body.ShareUsername);
		if (success < 0) {
			res.status(400).send({
				type: "bad request",
				message: message,
			});
		}
	} catch (e) {
		res.status(400).send({
			type: "bad request",
			message: "invalid parameters",
		});
	}
});

// setAssignee
secureApiRouter.post("/list/item/assignee", async (req, res) => {
	try {
		await DB.setAssignee(
			req.body.ListID,
			req.body.ItemIndex,
			req.body.Assignee
		);
	} catch (e) {
		res.status(400).send({
			type: "bad request",
			message: "invalid parameters",
		});
	}
});

// updateItemDone
secureApiRouter.post("/list/item/done", async (req, res) => {
	try {
		await DB.updateItemDone(
			req.body.ListID,
			req.body.ItemIndex,
			req.body.IsDone
		);
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
	res.sendFile("index.html", { root: "public" });
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
