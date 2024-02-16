# Introduction
This notes file will contain references to notes taken for CS260 along with some overview information for the class. It can be referenced while taking the **midterm** and **final exam**.

# Caddy
Caddy is a web service that listens for incoming HTTP requests. It can serve static files or route requests to other web services. Caddy is able to handle the creation and rotation of web certificats.

# HTTPS and TLS
HTTPS is a secure version of HTTP which uses the TLS protocol to secure and encrypt the connection.

# Web Applications
The ability of web interfaces to reconfigure themselves according to screen size and orientation is called responsive design.

# HTML Structure
Here is an example of some basic HTML structure:
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" type="text/css" href="index.css" />
  </head>
  <body>
    <p>Center text in centered element</p>
  </body>
</html>
```

# CSS Syntax
Here is an example of some basic CSS syntax:
```css
* {
	border: thick solid blue;
	box-sizing: border-box;
	padding: 0.2em;
	font-size: 24px;
	font-family: Arial;
}
  
html {
	height: 100%;
}
  
body {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	overflow: hidden;
}
  
p {
	width: 50%;
	height: 50%;
	display: flex;
	align-items: center;
	text-align: center;
}
```

# Deploying
When we use the deployment script, it SSHs into our server and updates a service which runs our web server for the startup application.

# JavaScript
This is a weakly typed language. Since there are so many browser versions running different versions of JavaScript, it is important to keep this in mind when choosing whether or not you will use some feature.

Here is an example of some syntax with a function that concatenates strings:
```javascript
function join(a, b) {
  return a + ' ' + b;
}

console.log(join('Hello', 'world'));
// OUTPUT: Hello world
```

It is not usually necessary, but it is good form to use semicolons(`;`) to separate statements.

## Debugging
You can use the console object to perform different debugging functions. `console.log()` lets you print out a string. You can use formatting like this: `console.log("this string %s", "is formatted")`.
The `console.time(id)` and `console.timeEnd(id)` functions let you specify a timer identifier string and then print the elapsed time on end.

Similarly, you can use `console.count(id)` with a string identifier and it will print out an incremented count along with the identifier each time.