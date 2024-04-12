import React from 'react';
import GithubIcon from "./GithubIcon.jsx"
import CheckedBox from './CheckedBox.jsx';
import './styles/app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { AuthState } from './login/authState';
import { Lists } from './lists/lists';
import { List } from './list/list';
import { Theme } from './theme/theme';
import { About } from './about/about';

export default function App() {
	const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
	const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
	const [authState, setAuthState] = React.useState(currentAuthState);
	
	return (
	<BrowserRouter>
		<div className='body'>
			<header>
				<span className="header-left">
					<CheckedBox />
					<h1>TODO List</h1>
					<menu className='navbar-nav'>
						<span><NavLink className='nav-link' to=''>Home</NavLink></span>
						<span><NavLink className='nav-link' to='lists'>Lists</NavLink></span>
						<span><NavLink className='nav-link' to='theme'>Theme</NavLink></span>
						<span><NavLink className='nav-link' to='about'>About</NavLink></span>
					</menu>
				</span>
				<span className="header-right">
					<p className="username">{userName}</p>
				</span>
			</header>

			<Routes>
				<Route
					path='/'
					element={
						<Login
							userName={userName}
							authState={authState}
							onAuthChange={(userName, authState) => {
							setAuthState(authState);
							setUserName(userName);
							}}
						/>
					}
					exact
				/>
				<Route path='/lists' element={<Lists />} />
				<Route path='/theme' element={<Theme />} />
				<Route path='/about' element={<About />} />
				<Route path='*' element={<NotFound />} />
			</Routes>

			<footer>
				<p>Author: Ben Madsen</p>
				<GithubIcon />
			</footer>
		</div>;
	</BrowserRouter>
	);
}

function NotFound() {
	return <main>404: Return to sender. Address unknown.</main>;
}