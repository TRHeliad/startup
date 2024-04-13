import React from "react";

import "./theme.css";

const colorNames = [
	"primary-color",
	"secondary-color",
	"tertiary-color",
	"back-color",
	"back2-color",
];
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
			model: "default",
		};

		var http = new XMLHttpRequest();

		http.onreadystatechange = function () {
			if (http.readyState == 4 && http.status == 200) {
				var palette = JSON.parse(http.responseText).result;
				resolve(palette);
			} else if (http.status != 200 && http.status != 0) {
				reject(http.status);
			}
		};

		http.open("POST", url, true);
		http.send(JSON.stringify(data));
	});
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
		});
		loadTheme();
		setInputToTheme();
	});
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
		const matches = document
			.querySelector("#" + colorName)
			.value.match(/[a-f0-9]{6}/i);
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
			root.style.setProperty("--" + colorName, "#" + color);
		}
	}
}

function setInputToTheme() {
	const theme = getSavedTheme();
	for (const colorName of colorNames) {
		const color = theme[colorName];
		if (color !== undefined) {
			const inputElement = document.querySelector("#" + colorName);
			if (inputElement !== null) inputElement.value = color;
		}
	}
}

export function Theme({ theme, setTheme }) {
	const [newTheme, setNewTheme] = React.useState(Object.assign({}, theme));

	function updateColor(color, e) {
		const newThemeCopy = Object.assign({}, newTheme);
		if (e.target.value === "")
			delete newThemeCopy[color]
		else
			newThemeCopy[color] = e.target.value;
		setNewTheme(newThemeCopy);
	}

	return (
		<main className="theme-view">
			<div className="theme-container">
				<div className="input">
					<label>Primary Color: </label>
					<input
						id="primary-color"
						name="varPrimaryColor"
						required
						pattern="[a-fA-F0-9]{6}"
						defaultValue={theme["primary-color"]}
						onChange={(e) => updateColor("primary-color", e)}
					/>
				</div>
				<div className="input">
					<label>Secondary Color: </label>
					<input
						id="secondary-color"
						name="varSecondaryColor"
						required
						pattern="[a-fA-F0-9]{6}"
						defaultValue={theme["secondary-color"]}
						onChange={(e) => updateColor("secondary-color", e)}
					/>
				</div>
				<div className="input">
					<label>Tertiary Color: </label>
					<input
						id="tertiary-color"
						name="varTertiaryColor"
						required
						pattern="[a-fA-F0-9]{6}"
						defaultValue={theme["tertiary-color"]}
						onChange={(e) => updateColor("tertiary-color", e)}
					/>
				</div>
				<div className="input">
					<label>Background Color: </label>
					<input
						id="back-color"
						name="varBackColor"
						required
						pattern="[a-fA-F0-9]{6}"
						defaultValue={theme["back-color"]}
						onChange={(e) => updateColor("back-color", e)}
					/>
				</div>
				<div className="input">
					<label>Background Color 2: </label>
					<input
						id="back2-color"
						name="varBackColor2"
						required
						pattern="[a-fA-F0-9]{6}"
						defaultValue={theme["back2-color"]}
						onChange={(e) => updateColor("back2-color", e)}
					/>
				</div>
			</div>
			<div className="button-container">
				<button onClick={() => setTheme(newTheme)} id="updateButton">
					Update
				</button>
				<button onClick={() => setRandomTheme()} id="randomButton">
					Random Theme
				</button>
			</div>
		</main>
	);
}
