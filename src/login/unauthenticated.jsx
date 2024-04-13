import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Unauthenticated(props) {
	const navigate = useNavigate();

	async function login() {
		loginOrCreate(`/api/auth/login`);
	}
	
	async function register() {
		loginOrCreate(`/api/auth/create`);
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
			props.onLogin(username);
			navigate('/lists')
		} else {
			// error display
		}
	}
	
	return (
		<div className="login-container">
			<h2>LOGIN</h2>
			<div className="input">
				<div><label>Username: </label></div>
				<div><input type="username" id="username" name="varUsername" placeholder="" required pattern="\w{3,20}" /></div>
			</div>
			<div className="input">
				<div><label>Password: </label></div>
				<div><input type="password" id="password" name="varPassword" placeholder="" required pattern="\w{3,20}" /></div>
			</div>
			<div className="button-container">
				<button onClick={() => login()} id="loginButton">Login</button>
				<button onClick={() => register()} id="registerButton">Register</button>
			</div>
		</div>
	)
}