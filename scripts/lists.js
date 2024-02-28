function getLists() {
	let lists = JSON.parse(localStorage.getItem("lists"));
	lists = lists === null ? [] : lists;
	return lists;
}

function createList() {
	const listNameElement = document.querySelector(".create-list-container #newList");
	let listName = listNameElement.value;
	let username = localStorage.getItem("userName");
	let newList = { Name: listName, Creator: username, Items: null };
	let lists = getLists()
	lists.push(newList);
	localStorage.setItem("lists", JSON.stringify(lists));
}