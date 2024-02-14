var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.6.3.min.js'; // Check https://jquery.com/ for the current version
document.getElementsByTagName('head')[0].appendChild(script);

function load_svgs() {
	$( ".checked-box" ).load( "checked-box.html" );
	$( ".unchecked-box" ).load( "unchecked-box.html" );
}

window.onload = function ()
{
	$( "#header" ).load( "header.html", load_svgs );
	$( "#footer" ).load( "footer.html", load_svgs );
}