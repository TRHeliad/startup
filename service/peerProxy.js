const { WebSocketServer } = require("ws");
const uuid = require("uuid");
const forward_types = {
	setAssignee: true,
	setIsDone: true,
	addItem: true
}

function peerProxy(httpServer) {
	// Create a websocket object
	const wss = new WebSocketServer({ noServer: true });

	// Handle the protocol upgrade from HTTP to WebSocket
	httpServer.on("upgrade", (request, socket, head) => {
		wss.handleUpgrade(request, socket, head, function done(ws) {
			wss.emit("connection", ws, request);
		});
	});

	// Keep track of all the connections so we can forward messages
	let connections = [];
	// Group all connections that correspond to a list
	let list_groups = {};

	wss.on("connection", (ws) => {
		const connection = { id: uuid.v4(), alive: true, ws: ws, groups: new Set() };
		connections.push(connection);

		ws.on("message", function message(data) {
			const message = JSON.parse(data);
			if (message.type === "joinList") {
				if (!(message.listID in list_groups))
					list_groups[message.listID] = new Set();
				list_groups[message.listID].add(connection);
				connection.groups.add(message.listID);
			} else {
				// Forward messages to people in the list group other than the sender
				if (message.type in forward_types && message.listID) {
					list_groups[message.listID].forEach((c) => {
						if (c.id !== connection.id) {
							c.ws.send(data);
						}
					})
				}
			}
		});

		// Remove the closed connection so we don't try to forward anymore
		ws.on("close", () => {
			const pos = connections.findIndex((o, i) => o.id === connection.id);

			if (pos >= 0) {
				connections.splice(pos, 1);
			}

			connection.groups.forEach((listID) =>{
				list_groups[listID].delete(connection);
			})
		});

		// Respond to pong messages by marking the connection alive
		ws.on("pong", () => {
			connection.alive = true;
		});
	});

	// Keep active connections alive
	setInterval(() => {
		connections.forEach((c) => {
			// Kill any connection that didn't respond to the ping last time
			if (!c.alive) {
				c.ws.terminate();
			} else {
				c.alive = false;
				c.ws.ping();
			}
		});
	}, 10000);
}

module.exports = { peerProxy };
