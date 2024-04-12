import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Authenticated(props) {
	const navigate = useNavigate();
	
	function logout() {
		localStorage.removeItem("userName");
		fetch(`/api/auth/logout`, {
			method: "delete",
		}).then(() => (props.onLogout()));
	}

	return (
		<div className="welcome-container">
			<h2>WELCOME</h2>
			<h3 className="username">OnlyTwentyCharacters</h3>
			<div className="button-container">
				<button onClick={() => navigate('/lists')} id="listsButton">Lists</button>
				<button onClick={() => logout()} id="logoutButton">Logout</button>
			</div>
		</div>
	)
}