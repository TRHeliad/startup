function login() {
	const usernameElement = document.querySelector("#username");
	const passwordElement = document.querySelector("#password");
	localStorage.setItem("userName", usernameElement.value);
	// For now the password will be ignored

	document.location.href = "/lists.html";
}

async function loginOrCreate(endpoint) {
	const username = document.querySelector("#username")?.value;
	const password = document.querySelector("#password")?.value;

	const response = await fetch(endpoint, {
		method: "post",
		body: JSON.stringify({ username: username, password: password }),
		headers: {
			"Content-type": "application/json; charset=UTF-8",
		},
	});

	if (response.ok) {
		localStorage.setItem("userName", username);
		window.location.href = "lists.html";
	} else {
		// error display
	}
}

window.addEventListener("load", function () {});
