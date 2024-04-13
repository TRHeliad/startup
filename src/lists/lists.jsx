import React from "react";
import { useNavigate } from 'react-router-dom';

import "./lists.css";

async function getLists() {
	const username = localStorage.getItem("userName");
	if (username) {
		const response = await fetch('/api/lists/'+username);
		return await response.json();
	} else
		return [];
}

export function Lists(props) {
	const navigate = useNavigate();
	const [lists, setLists] = React.useState([]);

	React.useEffect(() => {
		getLists().then((result) => {
			setLists(result);
		});
	}, []);

	const listsRows = [];
	if (lists.length) {
		lists.forEach(function (list, i) {
			listsRows.push(
				<tr 
					key={list._id}
					onClick={() => {
						localStorage.setItem("selectedListID", list._id);
						navigate('/list');
					}}>
					<td key="name">{list.name}</td>
					<td key="creator">{list.creator}</td>
				</tr>
			)
		})
	}
	
	async function createList() {
		const listNameElement = document.querySelector(".create-list-container #newList");
		const listName = listNameElement.value;
		const username = localStorage.getItem("userName");
		const response = await fetch('/api/list', {
			method: 'POST',
			headers: {'content-type': 'application/json'},
			body: JSON.stringify({
				Username: username,
				ListName: listName,
			})
		});
	}

	return (
		<main className="lists-view">
			<h1>Lists</h1>
			<table>
				<thead>
					<tr id="table-header">
						<th id="name">Name</th>
						<th id="creator">Creator</th>
					</tr>
				</thead>
				<tbody key="lists">{listsRows}</tbody>
			</table>
			<div className="create-list-container">
				<label>New List: </label>
				<input id="newList" required pattern="\w{3,40}" />
				<button onClick={async () => {
					await createList();
					getLists().then((result) => {
						setLists(result);
					});
				}}>Create</button>
			</div>
		</main>
	);
}