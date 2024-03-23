let setAssigneeIndex = null;
let rowElements = null;
let list = null;
let selectedListID = null

async function getSelectedList() {
	selectedListID = localStorage.getItem("selectedListID");
	console.log(selectedListID)
	const response = await fetch('/api/list/'+selectedListID);
	list = await response.json();
	console.log(list);
	return list;
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
	if (list !== null) {
		const listItem = list.items[itemIndex];
		if (listItem !== undefined) {
			listItem.isDone = isDone;
			setCheckboxType(rowElements[itemIndex].querySelector("td > div"), listItem.isDone);
			fetch('/api/list/item/done', {
				method: 'POST',
				headers: {'content-type': 'application/json'},
				body: JSON.stringify({
					ListID: selectedListID,
					ItemIndex: itemIndex,
					IsDone: isDone
				})
			});
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
		if (list !== null) {
			const listItem = list.items[setAssigneeIndex];
			if (listItem !== undefined) {
				fetch('/api/list/item/assignee', {
					method: 'POST',
					headers: {'content-type': 'application/json'},
					body: JSON.stringify({
						ListID: selectedListID,
						ItemIndex: setAssigneeIndex,
						Assignee: document.querySelector(".assignee-box input").value
					})
				});
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
	newTaskCol.textContent = listItem.task;
	const newAssigneeCol = document.createElement("td");
	newAssigneeCol.textContent = listItem.assignee === null ? "-" : listItem.assignee;
	newAssigneeCol.className = "assignee"
	const newDoneCol = document.createElement("td");
	const checkboxElement = document.createElement("div");
	newDoneCol.appendChild(checkboxElement);
	setCheckboxType(checkboxElement, listItem.isDone);

	newAssigneeCol.addEventListener("click", function(event) {
		showSetAssigneeBox(i);
	})

	checkboxElement.addEventListener("click", function(event) {
		const listItem = list.items[i];
		updateItemDone(i, !listItem.isDone);
	})
	
	const newRowElement = document.createElement("tr");
	newRowElement.appendChild(newTaskCol);
	newRowElement.appendChild(newAssigneeCol);
	newRowElement.appendChild(newDoneCol);

	return newRowElement;
}

async function loadList() {
	const tbodyElement = document.querySelector("tbody");
	const nameLabelElement = document.querySelector("main > h1");
	const list = await getSelectedList()

	if (list !== null) {
		nameLabelElement.textContent = list.name;
		rowElements = []
		list.items.forEach(function (listItem, i) {
			const rowElement = createRowFromItem(listItem, i);
			tbodyElement.appendChild(rowElement);
			rowElements.push(rowElement);
		})
	} else {
		nameLabelElement.textContent = "No List Selected";
	}
}

async function addItem() {
	const itemTaskElement = document.querySelector(".add-item-container #newItem");
	const itemTask = itemTaskElement.value;

	const response = await fetch('/api/list/item/', {
		method: 'POST',
		headers: {'content-type': 'application/json'},
		body: JSON.stringify({
			ListID: list._id,
			Task: itemTask
		})
	});

	clearList();
	loadList();
}

function changeRandomCheckbox() {
	if (list.items.length > 0) {
		const randomRow = Math.floor(Math.random() * list.items.length);
		updateItemDone(randomRow, !list.items[randomRow].isDone);
	}
	queueCheckboxChange();
}

function queueCheckboxChange() {
	setTimeout(changeRandomCheckbox, 3000);
}

window.addEventListener("load", function() {
	loadList();
	//queueCheckboxChange();
})