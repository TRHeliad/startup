import React from "react";

import "./list.css";
import { ListRow } from "./listrow";
import { ModalMessage } from "../modalmessage";

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

function postItemDone(itemIndex, isDone) {
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

function postAssignee(itemIndex, assignee) {
	fetch("/api/list/item/assignee", {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({
			ListID: selectedListID,
			ItemIndex: itemIndex,
			Assignee: assignee
		}),
	});
}

async function addItem(task) {
	const response = await fetch("/api/list/item/", {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({
			ListID: list._id,
			Task: task,
		}),
	});
}

let cache = [];
function replacer(key, value) {
	if (typeof value === "object" && value !== null) {
		if (cache.indexOf(value) !== -1) {
			// Circular reference found, discard key
			return;
		}
		// Store value in our collection
		cache.push(value);
	}
	return value;
}

let assigneeIndex = 0;
let newAssignee = "";
let newTask = "";
let shareUsername = "";
export function List({ }) {
	const protocol = window.location.protocol === "http:" ? "ws" : "wss";
	const [list, setList] = React.useState({});
	const [socket, setSocket] = React.useState(new WebSocket(`${protocol}://${window.location.host}/ws`));
	const [assigneeVisible, setAssigneeVisible] = React.useState(false);
	const [shareVisible, setShareVisible] = React.useState(false);
	const [modalMessage, setModalMessage] = React.useState({
		title: "",
		description: "",
		duration: 1
	});

	function createModalMessage(title, description, duration) {
		setModalMessage({
			title: title,
			description: description,
			duration: duration
		})
	}

	function getFreshList() {
		getSelectedList().then((result) => {
			setList(result);
		});
	}

	React.useEffect(() => {
		getFreshList()
	}, []);

	React.useEffect(() => {
		// Websocket
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
				const newList = Object.assign({}, list);
				newList.items[msg.itemIndex].isDone = msg.isDone;
				setList(newList);
			} else if (msg.type === "setAssignee") {
				const newList = Object.assign({}, list);
				newList.items[msg.itemIndex].assignee = msg.assignee;
				setList(newList);
			} else if (msg.type === "addItem") {
				getFreshList()
			}
		};
	}, [socket, list]);

	const rowList = [];
	if ("items" in list) {
		list.items.forEach(function (listItem, i) {
			rowList.push(
				<ListRow
					key={i}
					index={i}
					list={list}
					onAssigneeClick={() => {
						assigneeIndex = i;
						setAssigneeVisible(true);
					}}
					onIsDoneClick={() => {
						const isDone = !listItem.isDone;
						const newList = Object.assign({}, list);
						newList.items[i].isDone = isDone;
						setList(newList);
						socket.send(
							JSON.stringify({
								type: "setIsDone",
								listID: selectedListID,
								itemIndex: i,
								isDone: isDone,
							}, replacer)
						);
						postItemDone(i, isDone);
					}}
				/>
			);
		});
	}

	const assigneeBoxClass =
		"assignee-box input-modal" + (assigneeVisible ? " show" : "");
	const shareBoxClass =
		"share-box input-modal" + (shareVisible ? " show" : "");

	function setAssignee() {
		list.items[assigneeIndex].assignee = newAssignee;
		setList(list);
		socket.send(
			JSON.stringify(
				{
					type: "setAssignee",
					listID: selectedListID,
					itemIndex: assigneeIndex,
					assignee: newAssignee,
				},
				replacer
			)
		);
		postAssignee(assigneeIndex, newAssignee);
		setAssigneeVisible(false);
	}

	function onAssigneeChange(e) {
		newAssignee = e.target.value;
	}

	function onTaskChange(e) {
		newTask = e.target.value;
	}

	function onShareChange(e){
		shareUsername = e.target.value;
	}

	async function shareList() {
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
	
		setShareVisible(false);
	}

	return (
		<>
			<main className="list-view">
				<div className="list-header">
					<h1>Cleaning List</h1>
					<button onClick={() => (setShareVisible(!shareVisible))}>Share</button>
				</div>

				<div className="table-container">
					<table>
						<thead>
							<tr id="table-header">
								<th>Task</th>
								<th>Assignee</th>
								<th>Done</th>
							</tr>
						</thead>
						<tbody>{rowList}</tbody>
					</table>
				</div>

				<div className="add-item-container">
					<label>New item: </label>
					<input id="newItem" onChange={(e) => onTaskChange(e)}/>
					<button onClick={async () => {
						await addItem(newTask)
						socket.send(
							JSON.stringify({
								type: "addItem",
								listID: selectedListID,
								task: newTask,
							})
						);
						getFreshList()
					}}>Add</button>
				</div>

				<div className={assigneeBoxClass}>
					<label>Set Assignee</label>
					<input id="assignee" onChange={(e) => onAssigneeChange(e)} />
					<button onClick={() => setAssignee()}>Set</button>
				</div>

				<div className={shareBoxClass}>
					<label>Share list</label>
					<input id="shareUsername" onChange={(e) => onShareChange(e)} />
					<button onClick={() => (shareList())}>Share</button>
				</div>
			</main>
			<ModalMessage
				title={modalMessage.title}
				description={modalMessage.description}
				duration={modalMessage.duration}
			/>
		</>
	);
}
