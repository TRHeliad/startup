function getLists() {
	let lists = JSON.parse(localStorage.getItem("lists"));
	lists = lists === null ? [] : lists;
	return lists;
}

function getSelectedList() {
	const selectedListIndex = localStorage.getItem("selectedList");
	const lists = getLists();
	if (lists[selectedListIndex] === undefined)
		return null;
	return lists[selectedListIndex];
}

function clearList() {
	const tbodyElement = document.querySelector("tbody");
	// Clear out lists table
	const listElements = document.querySelectorAll("tr:not(#table-header)");
	for (const rowElement of listElements) {
		tbodyElement.removeChild(rowElement)
	}
}

function setCheckboxType(divElement, isChecked) {
	if (isChecked) {
		$(divElement).load("checked-box.html")
	} else {
		$(divElement).load("unchecked-box.html")
	}
}

function updateItemDone(itemIndex) {
	const list = getLists()
}

function createRowFromItem(listItem, i) {
	const newTaskCol = document.createElement("td");
	newTaskCol.textContent = listItem.Task;
	const newAssigneeCol = document.createElement("td");
	newAssigneeCol.textContent = listItem.Assignee === null ? "-" : listItem.Assignee;
	newAssigneeCol.className = "Assignee"
	const newDoneCol = document.createElement("td");
	const checkboxElement = document.createElement("div");
	newDoneCol.appendChild(checkboxElement);
	setCheckboxType(checkboxElement, listItem.IsDone);

	newAssigneeCol.addEventListener("click", function(event) {

	})

	checkboxElement.addEventListener("click", function(event) {

	})
	
	const newRowElement = document.createElement("tr");
	newRowElement.appendChild(newTaskCol);
	newRowElement.appendChild(newAssigneeCol);
	newRowElement.appendChild(newDoneCol);

	return newRowElement;
}

function loadList() {
	const tbodyElement = document.querySelector("tbody");
	const nameLabelElement = document.querySelector("main > h1");
	const list = getSelectedList()

	if (list !== null) {
		list.Items.forEach(function (listItem, i) {
			const rowElement = createRowFromItem(listItem, i);
			tbodyElement.appendChild(rowElement);
		})
	} else {
		nameLabelElement.textContent = "No List Selected";
	}
}