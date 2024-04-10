import { createModalMessage } from "./modalmessage.js";

let setAssigneeIndex = null;
let rowElements = null;
let list = null;
let selectedListID = null;
let socket = null;

async function getSelectedList() {
	selectedListID = localStorage.getItem("selectedListID");
	const response = await fetch("/api/list/" + selectedListID);
	list = await response.json();
	return list;
}

function clearList() {
	const tbodyElement = document.querySelector("tbody");
	// Clear out lists table
	const listElements = document.querySelectorAll("tr:not(#table-header)");
	for (const rowElement of listElements) {
		tbodyElement.removeChild(rowElement);
	}
}

function setCheckboxType(divElement, isChecked) {
	if (isChecked) {
		$(divElement).load("checked-box.html");
	} else {
		$(divElement).load("unchecked-box.html");
	}
}

function updateItemDone(itemIndex, isDone, localOnly) {
	if (list !== null) {
		const listItem = list.items[itemIndex];
		if (listItem !== undefined) {
			listItem.isDone = isDone;
			setCheckboxType(
				rowElements[itemIndex].querySelector("td > div"),
				listItem.isDone
			);
			if (!localOnly) {
				fetch("/api/list/item/done", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({
						ListID: selectedListID,
						ItemIndex: itemIndex,
						IsDone: isDone,
					}),
				});
			}
		}
	}
}

function showSetAssigneeBox(assigneeIndex) {
	setAssigneeIndex = assigneeIndex;
	document.querySelector(".assignee-box input").value = "";
	document.querySelector(".assignee-box").classList.add("show");
}

function verifyAssignee(assignee) {
	// will add verification with database later
	return assignee;
}

function setAssignee(itemIndex, assignee, localOnly) {
	if (itemIndex !== null) {
		if (list !== null) {
			const listItem = list.items[itemIndex];
			if (listItem !== undefined) {
				listItem.Assignee = assignee;
				if (!localOnly) {
					fetch("/api/list/item/assignee", {
						method: "POST",
						headers: { "content-type": "application/json" },
						body: JSON.stringify({
							ListID: selectedListID,
							ItemIndex: itemIndex,
							Assignee: document.querySelector(
								".assignee-box input"
							).value,
						}),
					});
				}
				const assigneeElement = document.querySelector(
					`#row${itemIndex} .assignee`
				);
				if (assigneeElement) assigneeElement.textContent = assignee;
				// clearList();
				// loadList();
			}
		}
	}
}

function createRowFromItem(listItem, i) {
	const newTaskCol = document.createElement("td");
	newTaskCol.textContent = listItem.task;
	const newAssigneeCol = document.createElement("td");
	newAssigneeCol.textContent =
		listItem.assignee === null ? "-" : listItem.assignee;
	newAssigneeCol.className = "assignee";
	const newDoneCol = document.createElement("td");
	const checkboxElement = document.createElement("div");
	newDoneCol.appendChild(checkboxElement);
	setCheckboxType(checkboxElement, listItem.isDone);

	newAssigneeCol.addEventListener("click", function (event) {
		showSetAssigneeBox(i);
	});

	checkboxElement.addEventListener("click", function (event) {
		const listItem = list.items[i];
		const isDone = !listItem.isDone;
		updateItemDone(i, isDone, false);
		socket.send(
			JSON.stringify({
				type: "setIsDone",
				listID: selectedListID,
				itemIndex: i,
				isDone: isDone,
			})
		);
	});

	const newRowElement = document.createElement("tr");
	newRowElement.id = `row${i}`;
	newRowElement.appendChild(newTaskCol);
	newRowElement.appendChild(newAssigneeCol);
	newRowElement.appendChild(newDoneCol);

	return newRowElement;
}

let shareOpened = false;
function openShare() {
	document.querySelector(".share-box input").value = "";
	document.querySelector(".share-box").classList.add("show");
	shareOpened = true;
}

function closeShare() {
	document.querySelector(".share-box").classList.remove("show");
	shareOpened = false;
}

function toggleShareBox() {
	(shareOpened ? closeShare : openShare)();
}

async function shareList() {
	const shareUsername = document.querySelector(".share-box input").value;
	const response = await fetch("/api/list/share", {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({
			ListID: selectedListID,
			ShareUsername: shareUsername,
		}),
	});

	if (response.ok) {
		createModalMessage("Success", `Shared with ${shareUsername}`, 2);
	} else {
		const body = await response.json();
		createModalMessage(body.type, body.message, 3);
	}

	closeShare();
}

async function loadList() {
	const tbodyElement = document.querySelector("tbody");
	const nameLabelElement = document.querySelector(".list-header > h1");
	const list = await getSelectedList();

	if (list !== null) {
		nameLabelElement.textContent = list.name;
		rowElements = [];
		list.items.forEach(function (listItem, i) {
			const rowElement = createRowFromItem(listItem, i);
			tbodyElement.appendChild(rowElement);
			rowElements.push(rowElement);
		});
	} else {
		nameLabelElement.textContent = "No List Selected";
	}
}

async function addItem(task, localOnly) {
	if (!localOnly) {
		const response = await fetch("/api/list/item/", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				ListID: list._id,
				Task: task,
			}),
		});
	}

	clearList();
	loadList();
}

function configureWebSocket() {
	const protocol = window.location.protocol === "http:" ? "ws" : "wss";
	socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
	socket.onopen = (event) => {
		socket.send(
			JSON.stringify({
				type: "joinList",
				listID: selectedListID,
			})
		);
	};
	socket.onclose = (event) => {
		createModalMessage("error", "socket disconnected", 3);
	};
	socket.onmessage = async (event) => {
		const msg = JSON.parse(await event.data.text());
		if (msg.type === "setIsDone") {
			updateItemDone(msg.itemIndex, msg.isDone, true);
		} else if (msg.type === "setAssignee") {
			setAssignee(msg.itemIndex, msg.assignee, true);
		} else if (msg.type === "addItem") {
			addItem(msg.task, true);
		}
	};
}

window.addEventListener("load", function () {
	const username = localStorage.getItem("userName");
	if (!username) {
		document.location.href = "index.html";
	}

	loadList();

	document
		.querySelector(".add-item-container > button")
		.addEventListener("click", () => {
			const task = document.querySelector(
				".add-item-container #newItem"
			)?.value;
			addItem(task, false);
			socket.send(
				JSON.stringify({
					type: "addItem",
					listID: selectedListID,
					task: task,
				})
			);
		});
	document
		.querySelector(".assignee-box > button")
		.addEventListener("click", () => {
			const assignee = document.querySelector(
				".assignee-box input"
			).value;
			setAssignee(setAssigneeIndex, assignee, false);
			socket.send(
				JSON.stringify({
					type: "setAssignee",
					listID: selectedListID,
					itemIndex: setAssigneeIndex,
					assignee: assignee,
				})
			);
			setAssigneeIndex = null;
			document.querySelector(".assignee-box").classList.remove("show");
		});
	document
		.querySelector(".list-header > button")
		.addEventListener("click", toggleShareBox);
	document
		.querySelector(".share-box > button")
		.addEventListener("click", shareList);

	configureWebSocket();
});
