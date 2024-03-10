function login() {
	const usernameElement = document.querySelector("#username");
	const passwordElement = document.querySelector("#password");
	localStorage.setItem("userName", usernameElement.value);
	console.log("stored")
	// For now the password will be ignored

	document.location.href = "/lists.html"
}