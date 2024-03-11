async function getLists() {
	const username = localStorage.getItem("userName");
	if (username) {
		const response = await fetch('/api/lists/'+username);
		return await response.json();
	} else
		return [];
}

function clearLists() {
	const tbodyElement = document.querySelector("tbody");
	// Clear out lists table
	const listElements = document.querySelectorAll("tr:not(#table-header)");
	for (const rowElement of listElements) {
		tbodyElement.removeChild(rowElement)
	}
}

async function loadLists() {
	const lists = await getLists();
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

async function createList() {
	const listNameElement = document.querySelector(".create-list-container #newList");
	let listName = listNameElement.value;
	let username = localStorage.getItem("userName");
	let newList = { Name: listName, Creator: username, Items: [] };
	let lists = getLists()
	lists.push(newList);
	localStorage.setItem("lists", JSON.stringify(lists));
	clearLists()
	await loadLists()
}

window.addEventListener("load", function() {
	loadLists();
})