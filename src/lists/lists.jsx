import React from 'react';

import './lists.css';

export function Lists() {
  return (
    <main>
		<h1>Lists</h1>
		<table>
			<tbody>
				<tr id="table-header">
					<th>Name</th>
					<th>Creator</th>
				</tr>
			</tbody>
		</table>
		<div className="create-list-container">
			<label>New List: </label>
			<input id="newList" required pattern="\w{3,40}"/>
			<button onclick="createList()">Create</button>
		</div>
    </main>
  );
}