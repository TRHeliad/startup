let setAssigneeIndex = null;

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

function updateItemDone(itemIndex, isDone) {
	const selectedListIndex = localStorage.getItem("selectedList");
	const lists = getLists();
	if (lists[selectedListIndex] === undefined)
		return;
	const list = lists[selectedListIndex];

	if (list !== null) {
		const listItem = list.Items[itemIndex];
		if (listItem !== undefined) {
			listItem.IsDone = isDone;
			localStorage.setItem("lists", JSON.stringify(lists));
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
	return assignee
}

function setAssignee() {
	if (setAssigneeIndex !== null) {
		const selectedListIndex = localStorage.getItem("selectedList");
		const lists = getLists();
		if (lists[selectedListIndex] === undefined)
			return;
		const list = lists[selectedListIndex];

		if (list !== null) {
			const listItem = list.Items[setAssigneeIndex];
			if (listItem !== undefined) {
				listItem.Assignee = verifyAssignee(document.querySelector(".assignee-box input").value);
				localStorage.setItem("lists", JSON.stringify(lists));
				clearList();
				loadList();
			}
		}

		document.querySelector(".assignee-box").classList.remove("show");
		setAssigneeIndex = null
	}
}

function createRowFromItem(listItem, i) {
	const newTaskCol = document.createElement("td");
	newTaskCol.textContent = listItem.Task;
	const newAssigneeCol = document.createElement("td");
	newAssigneeCol.textContent = listItem.Assignee === null ? "-" : listItem.Assignee;
	newAssigneeCol.className = "assignee"
	const newDoneCol = document.createElement("td");
	const checkboxElement = document.createElement("div");
	newDoneCol.appendChild(checkboxElement);
	setCheckboxType(checkboxElement, listItem.IsDone);

	newAssigneeCol.addEventListener("click", function(event) {
		showSetAssigneeBox(i);
	})

	checkboxElement.addEventListener("click", function(event) {
		listItem.IsDone = !listItem.IsDone;
		updateItemDone(i, listItem.IsDone);
		setCheckboxType(checkboxElement, listItem.IsDone);
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
		nameLabelElement.textContent = list.Name;
		list.Items.forEach(function (listItem, i) {
			const rowElement = createRowFromItem(listItem, i);
			tbodyElement.appendChild(rowElement);
		})
	} else {
		nameLabelElement.textContent = "No List Selected";
	}
}

function addItem() {
	const selectedListIndex = localStorage.getItem("selectedList");
	const itemTaskElement = document.querySelector(".add-item-container #newItem");
	const itemTask = itemTaskElement.value;
	const newItem = { Task: itemTask, Assignee: null, IsDone: false };
	const lists = getLists();

	if (lists[selectedListIndex] === undefined)
		return;
	const list = lists[selectedListIndex];
	
	list.Items.push(newItem);
	localStorage.setItem("lists", JSON.stringify(lists));
	clearList();
	loadList();
}

window.addEventListener("load", function() {
	loadList();
})