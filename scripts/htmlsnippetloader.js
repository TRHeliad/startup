var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.6.3.min.js'; // Check https://jquery.com/ for the current version
document.getElementsByTagName('head')[0].appendChild(script);

function load_svgs() {
	$( ".checked-box" ).load( "checked-box.html" );
	$( ".unchecked-box" ).load( "unchecked-box.html" );
}

function load_header() {
	load_svgs()
	
	// Load username
	const usernameElement = document.querySelector(".username");
	let username = localStorage.getItem("userName");
	username = username == null ? "" : username
	console.log(usernameElement);
	usernameElement.textContent = username;
}

function load_footer() {
	load_svgs()
}

window.onload = function ()
{
	$( "#header" ).load( "header.html", load_header );
	$( "#footer" ).load( "footer.html", load_footer );
}