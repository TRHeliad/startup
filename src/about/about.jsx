import React from 'react';

import "./about.css";

export function About() {
  return (
    <main className="about-view">
		<p>Hello. This website was made by Ben Madsen. Here is an AI generated image of him:</p>
		<img src="assets/generated_portrait_square.jpg"/>
	</main>
  );
}