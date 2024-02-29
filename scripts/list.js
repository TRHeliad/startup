function getLists() {
	let lists = JSON.parse(localStorage.getItem("lists"));
	lists = lists === null ? [] : lists;
	return lists;
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
	
}

function createRowFromItem(listItem) {
	const newTaskCol = document.createElement("td");
	newTaskCol.textContent = listItem.Task;
	const newAsigneeCol = document.createElement("td");
	newAsigneeCol.textContent = listItem.Asignee === null ? "-" : listItem.Asignee;
	const newDoneCol = document.createElement("td");
	const checkboxElement = document.createElement("div");
	newDoneCol.appendChild(checkboxElement);
	setCheckboxType(checkboxElement, listItem.IsDone);

	checkboxElement.addEventListener("click", function(event) {

	})
	
	const newRowElement = document.createElement("tr");
	newRowElement.appendChild(newTaskCol);
	newRowElement.appendChild(newAsigneeCol);
	newRowElement.appendChild(newDoneCol);

	return newRowElement;
}

function loadList() {
	const tbodyElement = document.querySelector("tbody");
	const nameLabelElement = document.querySelector("main > h1");
	let noList = false;
	const selectedListIndex = localStorage.getItem("selectedList");
	const lists = getLists();

	if (selectedListIndex === null) {
		noList = true;
	} else if (lists[selectedListIndex] === undefined) {
		noList = true;
	} else {
		lists[selectedListIndex].Items.forEach(function (listItem, i) {
			const rowElement = createRowFromItem(listItem);
			tbodyElement.appendChild(rowElement);
		})
	}
	if (noList) {
		nameLabelElement.textContent = "No List Selected";
	}
}