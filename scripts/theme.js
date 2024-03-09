const colorNames = [
	"primary-color",
	"secondary-color",
	"tertiary-color",
	"back-color",
	"back2-color"
]
const root = document.querySelector(":root");

function componentToHex(c) {
	const hex = c.toString(16);
	return hex.length == 1 ? "0" + hex : hex;
}
  
function rgbToHex(r, g, b) {
	return componentToHex(r) + componentToHex(g) + componentToHex(b);
}

async function requestPalette() {
	return new Promise(function (resolve, reject) {
		var url = "https://color.bdm260.click/api/";
		var data = {
			model : "default"
		}
		
		var http = new XMLHttpRequest();
		
		http.onreadystatechange = function() {
			if(http.readyState == 4 && http.status == 200) {
				var palette = JSON.parse(http.responseText).result;
				resolve(palette);
			} else if (http.status != 200 && http.status != 0) {
				reject(http.status);
			}
		}
		
		http.open("POST", url, true);
		http.send(JSON.stringify(data));
	})
}

async function getRandomPalette() {
	const rgbPalette = await requestPalette();
	return rgbPalette.map((rgb) => rgbToHex(...rgb));
}

function setRandomTheme() {
	getRandomPalette().then(function (randomPalette) {
		randomPalette.forEach(function (hex, i) {
			const colorName = colorNames[i];
			updateColor(colorName, hex);
		})
		loadTheme();
		setInputToTheme();
	})
}

function getSavedTheme() {
	let theme = JSON.parse(localStorage.getItem("theme"));
	theme = theme === null ? {} : theme;
	return theme;
}

function updateColor(colorName, value) {
	const theme = getSavedTheme(); 
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
	loadTheme();
}

function loadTheme() {
	const theme = getSavedTheme();
	for (const colorName of colorNames) {
		const color = theme[colorName];
		if (color !== undefined) {
			root.style.setProperty("--"+colorName, "#"+color);
		}
	}
}

function setInputToTheme() {
	const theme = getSavedTheme();
	for (const colorName of colorNames) {
		const color = theme[colorName];
		if (color !== undefined) {
			document.querySelector("#"+colorName).value = color;
		}
	}
}

window.addEventListener("load", function() {
	loadTheme();
	setInputToTheme();
})