import React from "react";

import CheckedBox from "../CheckedBox";
import Uncheckedbox from "../UncheckedBox";

export function ListRow({ index, task, assignee, isDone }) {

	return (
		<tr key={index}>
			<td key="task">{task}</td>
			<td key="assignee">{assignee}</td>
			<td key="isDone">{isDone ? <CheckedBox/> : <Uncheckedbox/>}</td>
		</tr>
	)
}