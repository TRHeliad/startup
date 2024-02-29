const colorNames = [
	"primary-color",
	"secondary-color",
	"tertiary-color",
	"back-color",
	"back-color-2"
]

function getTheme() {
	let theme = JSON.parse(localStorage.getItem("theme"));
	theme = theme === null ? {} : theme;
	return theme;
}

function updateColor(colorName, value) {
	const theme = getTheme(); 
	theme[colorName] = value.toLowerCase();
	localStorage.setItem("theme", JSON.stringify(theme));
}

function updateTheme() {
	for (const colorName of colorNames) {
		const matches = document.querySelector("#"+colorName).value.match(/[a-f0-9]{6}/i);
		console.log(matches);
		if (matches.length > 0) {
			updateColor(colorName, matches[0]);
		}
	}
}

function loadTheme() {
	
}

window.addEventListener("load", function() {

})