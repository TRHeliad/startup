import React from 'react';
import GithubIcon from "./GithubIcon.jsx"
import './styles/app.css';
import CheckedBox from './CheckedBox.jsx';

export default function App() {
	return <div className='body bg-dark text-light'>
		<header>
			<span className="header-left">
				<CheckedBox />
				<h1>TODO List</h1>
				<nav>
					<span><a href="index.html">Home</a></span>
					<span><a href="lists.html">Lists</a></span>
					<span><a href="theme.html">Theme</a></span>
					<span><a href="about.html">About</a></span>
				</nav>
			</span>
			<span className="header-right">
				<p className="username">bmadsenonpc</p>
			</span>
		</header>

		<main>Components here</main>

		<footer>
			<p>Author: Ben Madsen</p>
			<GithubIcon />
		</footer>
	</div>;
}