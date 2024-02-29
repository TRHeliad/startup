function getLists() {
	let lists = JSON.parse(localStorage.getItem("lists"));
	lists = lists === null ? [] : lists;
	return lists;
}

function clearLists() {
	const tbodyElement = document.querySelector("tbody");
	// Clear out lists table
	const listElements = document.querySelectorAll("tr:not(#table-header)");
	for (const rowElement of listElements) {
		tbodyElement.removeChild(rowElement)
	}
}

function loadLists() {
	const lists = getLists();
	const tbodyElement = document.querySelector("tbody");
	// Add new lists
	lists.forEach(function (list, i) {
		const newNameCol = document.createElement("td");
		newNameCol.textContent = list.Name;
		const newCreatorCol = document.createElement("td");
		newCreatorCol.textContent = list.Creator;
		
		const newRowElement = document.createElement("tr");
		tbodyElement.appendChild(newRowElement);
		newRowElement.appendChild(newNameCol);
		newRowElement.appendChild(newCreatorCol);

		newRowElement.addEventListener("click", function(event) {
			localStorage.setItem("selectedList", i)
			document.location.href = "/list.html"
		})
	})
}

function createList() {
	const listNameElement = document.querySelector(".create-list-container #newList");
	let listName = listNameElement.value;
	let username = localStorage.getItem("userName");
	let newList = { Name: listName, Creator: username, Items: null };
	let lists = getLists()
	lists.push(newList);
	localStorage.setItem("lists", JSON.stringify(lists));
	clearLists()
	loadLists()
}