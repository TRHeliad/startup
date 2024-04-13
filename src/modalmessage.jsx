import React from "react";

import "./modalmessage.css";

export function ModalMessage({ title, description, duration }) {
	const [visible, setVisible] = React.useState(title !== "");
	const [hiding, setHiding] = React.useState(title !== "");

	React.useEffect(() => {
		setVisible(title !== "");
		if (title !== "") {
			setTimeout(() => {
				setHiding(true);
			}, duration * 1000);
			setTimeout(() => {
				setVisible(false);
			}, duration * 1300);
		}
	}, [title, description, duration])
	
	return (
		<div className={"message-modal" + (visible ? (hiding ? " hide" : "") : " hidden")}>
			<div className="background" />
			<div className="message-box">
				<label className="title">{title}</label>
				<label className="description">{description}</label>
			</div>
		</div>
	)
}