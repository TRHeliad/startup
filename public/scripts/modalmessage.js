let styleInserted = false;

var styles = `
.message-modal {
	animation: fadeIn 0.3s forwards;
	animation-duration: 1s;
	width: 100vw;
	height: 100vh;
	position: absolute;
	left: 0%;
	bottom: 0%;
}

.message-modal.hide {
	animation: fadeOut 0.3s forwards;
}

.message-modal .background{
	background-color: black;
	opacity: 0.5;
	width: 100%;
	height: 100%;
}

.message-modal .message-box {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 30vmin;
	height: auto;
	background-color: var(--back3-color);
	text-align: center;
	border-radius: 6px;
	padding: 8px 0;
	position: absolute;
	z-index: 10;
	bottom: 50%;
	left: 50%;
	margin-left: -15vmin;
}

.message-modal .title {
	color: var(--secondary-color);
	font-size: 3vmin;
	margin: 0.5vmin 0;
	flex: 1 0;
	width: 100%;
}

.message-modal .description {
	color: var(--primary-color);
	font-size: 2vmin;
	margin: 0.3vmin 0;
	flex: 1 0;
	width: 100%;
}

@keyframes fadeIn {
	from { opacity: 0; }
	to { opacity: 1; }
}
@keyframes fadeOut {
	from { opacity: 1; }
	to { opacity: 0; }
}
`

export function test(title, description) {
	console.log("test message")
}


export function createModalMessage(title, description, duration) {
	const messageContainer = document.createElement("div");
	messageContainer.className = "message-modal";
	const background = document.createElement("div");
	background.className = "background";
	messageContainer.appendChild(background);
	const messageBox = document.createElement("div");
	messageBox.className = "message-box";
	messageContainer.appendChild(messageBox)
	const titleLabel = document.createElement("label");
	titleLabel.textContent = title;
	titleLabel.className = "title";
	messageBox.appendChild(titleLabel);
	const descriptionLabel = document.createElement("label");
	descriptionLabel.textContent = description;
	descriptionLabel.className = "description";
	messageBox.appendChild(descriptionLabel);
	document.querySelector("body").appendChild(messageContainer);

	if (!styleInserted) {
		styleInserted = true
		var styleSheet = document.createElement("style");
		styleSheet.innerHTML = styles;
		document.head.appendChild(styleSheet);
	}
}