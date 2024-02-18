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

## Using in HTML
You can include JavaScript in HTML by using the `<script>` element and including it in the content or referencing a separate file using the `src` attribute.
You can then reference functions declared in the JavaScript or run any code in the scope of the script from special attributes like the `onclick` attribute. E.g.
```html
<body>
  <button onclick="sayGoodbye()">Say Goodbye</button>
  <script>
    function sayGoodbye() {
      alert('Goodbye');
    }
  </script>
</body>
```

## Variables and types
Here are some primitive types: `Null`, `Undefined`, `Boolean`, `Number`, `BigInt`, `String`, `Symbol`.
Here are some object types:
| Type | Use | Example |
| ---- | ---- | ---- |
| `Object` | A collection of properties represented by name-value pairs. Values can be of any type. | `{a:3, b:'fish'}` |
| `Function` | An object that has the ability to be called. | `function a() {}` |
| `Date` | Calendar dates and times. | `new Date('1995-12-17')` |
| `Array` | An ordered sequence of any type. | `[3, 'fish']` |
| `Map` | A collection of key-value pairs that support efficient lookups. | `new Map()` |
| `JSON` | A lightweight data-interchange format used to share information across programs. | `{"a":3, "b":"fish"}` |

Equality operations will perform type conversion before making any actual comparison. You can avoid this using the strict equality and inequality operators `===` and `!==`.

If statement syntax:
```javascript
if (a === 1) {
  //...
} else if (b === 2) {
  //...
} else {
  //...
}
```

Ternary operator:
```javascript
a === 1 ? console.log(1) : console.log('not 1');
```

Common boolean operators: `&&`, `||`, and `!`.

Common looping constructs: `for`, `for in`, `for of`, `while`, `do while`, and `switch`.
Where `for in` iterates over keys and `for of` iterates over values.

## Strings
When declaring literals, the ' and " are equivalent, but the ` can contain javascript that will be evaluated and concatenated into the string.

Common functions:
|Function|Meaning|
|---|---|
|length|The number of characters in the string|
|indexOf()|The starting index of a given substring|
|split()|Split the string into an array on the given delimiter string|
|startsWith()|True if the string has a given prefix|
|endsWith()|True if the string has a given suffix|
|toLowerCase()|Converts all characters to lowercase|

## Functions
Functions are first class objects, so they can be passed as a parameter, returned as a result, or referenced in arrays and other objects.

With parameters, if a value is not passed to the function, then the parameter's value will be `undefined`. Parameters can also have default values like so:
```javascript
function labeler(value, title = 'title') {
  console.log(`${title}=${value}`);
}
```

You can defined anonymous functions to be passed as parameters or assigned to objects. e.g.:
```javascript
console.log(
  doMath(
    function (a, b) {
      return a - b;
    },
    5,
    3
  )
);
```

You can also create inner functions, function declared within other functions.

### Arrow Functions
To quickly create anonymous functions, you can use arrow functions.
The returned value is the right statement when no curly braces are present, otherwise it uses the return statement.
```javascript
(a, b) => a + b;
// RETURNS: a + b

(a, b) => {
  a + b;
};
// RETURNS: undefined

(a, b) => {
  return a + b;
};
// RETURNS: a + b
```

Arrow functions inherit the this pointer and the scope in which they were created. This creates a `closure` which is basically a snapshot of the scope which is preserved for the function.

### Timeout
The function `setTimeout(func, timeMs)` will run a function after the given amount of time has passed and returns an ID. You can call `clearTimeout(id)` on the id to cancel the scheduled running of the function.
```javascript
function debounce(windowMs, windowFunc) {
  let timeout;
  return function () {
    console.log('scroll event');
    clearTimeout(timeout);
    timeout = setTimeout(() => windowFunc(), windowMs);
  };
}
```

## Arrays
The array object contains a sequence of other objects/primitives.
Here are some common functions:
| Function | Meaning | Example |
| ---- | ---- | ---- |
| push | Add an item to the end of the array | `a.push(4)` |
| pop | Remove an item from the end of the array | `x = a.pop()` |
| slice | Return a sub-array | `a.slice(1,-1)` |
| sort | Run a function to sort an array in place | `a.sort((a,b) => b-a)` |
| values | Creates an iterator for use with a `for of` loop | `for (i of a.values()) {...}` |
| find | Find the first item satisfied by a test function | `a.find(i => i < 2)` |
| forEach | Run a function on each array item | `a.forEach(console.log)` |
| reduce | Run a function to reduce each array item to a single item | `a.reduce((a, c) => a + c)` |
| map | Run a function to map an array to a new array | `a.map(i => i+i)` |
| filter | Run a function to remove items | `a.filter(i => i%2)` |
| every | Run a function to test if all items match | `a.every(i => i < 3)` |
| some | Run a function to test if any items match | `a.some(i => 1 < 1)` |