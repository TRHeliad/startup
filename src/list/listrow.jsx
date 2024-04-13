import React from "react";

import CheckedBox from "../CheckedBox";
import Uncheckedbox from "../UncheckedBox";

export function ListRow(props) {
	const [isDone, setIsDone] = React.useState(props.isDone);
	
	return (
		<tr key={props.index}>
			<td id="task">{props.task}</td>
			<td id="assignee" onClick={() => (props.onAssigneeClick())}>
				{props.assignee}
			</td>
			<td id="isDone" onClick={() => {
					setIsDone(!isDone);
					props.onIsDoneClick();
				}}>
				{isDone ? <CheckedBox/> : <Uncheckedbox/>}
			</td>
		</tr>
	)
}