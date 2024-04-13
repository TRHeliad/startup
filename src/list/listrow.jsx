import React from "react";

import CheckedBox from "../CheckedBox";
import Uncheckedbox from "../UncheckedBox";

export function ListRow(props) {
	let listItem = {task: "", assignee: "", isDone: false};
	if ("items" in props.list && props.list.items.length > props.index)
		listItem = props.list.items[props.index];
	
	return (
		<tr key={props.index}>
			<td id="task">{listItem.task}</td>
			<td id="assignee" onClick={() => (props.onAssigneeClick())}>
				{listItem.assignee}
			</td>
			<td id="isDone" onClick={() => {
					props.onIsDoneClick();
				}}>
				{listItem.isDone ? <CheckedBox/> : <Uncheckedbox/>}
			</td>
		</tr>
	)
}