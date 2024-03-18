# Introduction
This notes file will contain references to notes taken for CS260 along with some overview information for the class. It can be referenced while taking the **midterm** and **final exam**.

# Caddy
Caddy is a web service that listens for incoming HTTP requests. It can serve static files or route requests to other web services. Caddy is able to handle the creation and rotation of web certificats.

# HTTPS and TLS
HTTPS is a secure version of HTTP which uses the TLS protocol to secure and encrypt the connection.

# Web Applications
The ability of web interfaces to reconfigure themselves according to screen size and orientation is called responsive design.

# HTML
## Basic structure
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

## Elements
Here are some common element types: `body`, `header`, `footer`, `main`, `section`, `aside`, `p`, `table`, `ol`/`ul`, `div`, and `span`.
There are block elements and inline elements. Inline elements do not interrupt the content flow of a block element. Block elements are meant to be distinct sections of content.

# CSS
## Basic syntax
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

## Selectors
Example of a selector:
```css
section h2 {
  color: #004400;
}
```

There are different types of selectors and waits of combining them into one. Here is a list of combinators:

| Combinator       | Meaning                    | Example        | Description                                |
| ---------------- | -------------------------- | -------------- | ------------------------------------------ |
| Descendant       | A list of descendants      | `body section` | Any section that is a descendant of a body |
| Child            | A list of direct children  | `section > p`  | Any p that is a direct child of a section  |
| General sibling  | A list of siblings         | `div ~ p`      | Any p that has a div sibling               |
| Adjacent sibling | A list of adjacent sibling | `div + p`      | Any p that has an adjacent div sibling     |

There are class selectors (`.class-name`), ID selectors (`#id-name`), and attribute selectors (`p[class='class-name']`).
For the class and id selectors you can put them directly after an element type name to select all elements of that type with that id or class like so: `p.class-name`.
There are also pseudo selectors which can dynamically change the styling of elements based on relativistic/state properties. An example: `section:hover` is changing the css of `section` elements when the mouse hovers over them.

## CSS Declarations
| Property           | Value                              | Example             | Discussion                                                                     |
| ------------------ | ---------------------------------- | ------------------- | ------------------------------------------------------------------------------ |
| background-color   | color                              | `red`               | Fill the background color                                                      |
| border             | color width style                  | `#fad solid medium` | Sets the border using shorthand where any or all of the values may be provided |
| border-radius      | unit                               | `50%`               | The size of the border radius                                                  |
| box-shadow         | x-offset y-offset blu-radius color | `2px 2px 2px gray`  | Creates a shadow                                                               |
| columns            | number                             | `3`                 | Number of textual columns                                                      |
| column-rule        | color width style                  | `solid thin black`  | Sets the border used between columns using border shorthand                    |
| color              | color                              | `rgb(128, 0, 0)`    | Sets the text color                                                            |
| cursor             | type                               | `grab`              | Sets the cursor to display when hovering over the element                      |
| display            | type                               | `none`              | Defines how to display the element and its children                            |
| filter             | filter-function                    | `grayscale(30%)`    | Applies a visual filter                                                        |
| float              | direction                          | `right`             | Places the element to the left or right in the flow                            |
| flex               |                                    |                     | Flex layout. Used for responsive design                                        |
| font               | family size style                  | `Arial 1.2em bold`  | Defines the text font using shorthand                                          |
| grid               |                                    |                     | Grid layout. Used for responsive design                                        |
| height             | unit                               | `.25em`             | Sets the height of the box                                                     |
| margin             | unit                               | `5px 5px 0 0`       | Sets the margin spacing                                                        |
| max-[width/height] | unit                               | `20%`               | Restricts the width or height to no more than the unit                         |
| min-[width/height] | unit                               | `10vh`              | Restricts the width or height to no less than the unit                         |
| opacity            | number                             | `.9`                | Sets how opaque the element is                                                 |
| overflow           | [visible/hidden/scroll/auto]       | `scroll`            | Defines what happens when the content does not fix in its box                  |
| position           | [static/relative/absolute/sticky]  | `absolute`          | Defines how the element is positioned in the document                          |
| padding            | unit                               | `1em 2em`           | Sets the padding spacing                                                       |
| left               | unit                               | `10rem`             | The horizontal value of a positioned element                                   |
| text-align         | [start/end/center/justify]         | `end`               | Defines how the text is aligned in the element                                 |
| top                | unit                               | `50px`              | The vertical value of a positioned element                                     |
| transform          | transform-function                 | `rotate(0.5turn)`   | Applies a transformation to the element                                        |
| width              | unit                               | `25vmin`            | Sets the width of the box                                                      |
| z-index            | number                             | `100`               | Controls the positioning of the element on the z axis                          |

## Fonts
In order to add a font to the CSS:
```css
@font-face {
  font-family: 'Quicksand';
  src: url('https://cs260.click/fonts/quicksand.ttf');
}
/* Or import the css */
@import url('https://fonts.googleapis.com/css2?family=Rubik Microbe&display=swap'); 
```

## Animations
To describe an animation, you create keyframes:
```css
@keyframes demo {
  from {
    font-size: 0vh;
  }

  to {
    font-size: 20vh;
  }
}
```

and then assign it to an element:
```css
p {
  animation-name: demo;
  animation-duration: 3s;
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

## JSON
JavaScript Object Notation is primarily used for the storing of serialized objects.
It has only these data types:
|Type|Example|
|---|---|
|string|"crockford"|
|number|42|
|boolean|true|
|array|[null,42,"crockford"]|
|object|{"a":1,"b":"crockford"}|
|null|null|

You can convert to and from JSON using these functions:
```javascript
const obj = { a: 2, b: 'crockford', c: undefined };
const json = JSON.stringify(obj);
const objFromJson = JSON.parse(json);

console.log(obj, json, objFromJson);

// OUTPUT:
// {a: 2, b: 'crockford', c: undefined}
// {"a":2, "b":"crockford"}
// {a: 2, b: 'crockford'}
```

## Objects and classes
You can create objects in these two ways:
```javascript
const obj = new Object({ a: 3 });
const obj = {
  a: 3,
  b: 'fish',
};
```
The second way in the example is called `object-literal` syntax.
Objects have a this pointer which can be referenced by functions who are members of the object.
The `Object` object itself has some static functions which can be performed on object instances like so:
```javascript
const obj = {
  a: 3,
  b: 'fish',
};

console.log(Object.entries(obj));
// OUTPUT: [['a', 3], ['b', 'fish']]
console.log(Object.keys(obj));
// OUTPUT: ['a', 'b']
console.log(Object.values(obj));
// OUTPUT: [3, 'fish']
```

Functions that return an object are considered **constructors** and can be invoked using the `new` operator.
```javascript
function Person(name) {
  return {
    name: name,
  };
}
const p = new Person('Eich');
```

### Classes
While the above methods of creating objects were for more arbitrary usage, you can use the `class` keyword to create a reusable component for creating objects with a common structure.
```javascript
class Person {
  #name;
  constructor(name) {
    this.name = name;
  }
  log() {
    console.log('My name is ' + this.name);
  }
}
const p = new Person('Eich');
```

As shown above, you can prefix properties and functions is `#` to make them private.

### Inheritance
You can use the `extends` keyword to define inheritance for a class. You can then use super to access properties and functions of the parent class.
```javascript
class Person {
  constructor(name) {
    this.name = name;
  }

  print() {
    return 'My name is ' + this.name;
  }
}

class Employee extends Person {
  constructor(name, position) {
    super(name);
    this.position = position;
  }

  print() {
    return super.print() + '. I am a ' + this.position;
  }
}

const e = new Employee('Eich', 'programmer');
console.log(e.print());
// OUTPUT: My name is Eich. I am a programmer
```

## Regular Expressions
You can create regular expressions using Object construction or a literal:
```javascript
const objRegex = new RegExp('ab*', 'i');
const literalRegex = /ab*/i;
```
The second argument to RegExp is for flags and it was also at the end of the literal version. In this case, `i` was included which means case insensitive.
The `string` class can accept regular expressions for several functions.
| Function  | Description                                                       |
| --------- | ----------------------------------------------------------------- |
| `match`   | Returns an array of substrings which match the expression         |
| `replace` | Replaced substrings which match the expression with a new string  |
| `search`  | Returns the index of the first match of the expression            |
| `split`   | Returns an array of substrings which were split by the expression |
| `test`          | Returns true if there is at least one match of the expression in a string                                                                  |

## Rest and spread
You can turn remaining parameters of a function into an array using the `...name` syntax. You can also expand an array into function parameters using the spread syntax. Each are as follows:
```javascript
// Rest syntax
function hasNumber(test, ...numbers) {
  return numbers.some((i) => i === test);
}

// Spread syntax
function person(firstName, lastName) {
  return { first: firstName, last: lastName };
}
const p = person(...['Ryan', 'Dahl']);
```

## Exceptions
Exceptions should only be used in situations that are actually exceptional and not expected to be common. For example a configuration file is missing.
You use the `try`, `catch`, and `finally` syntax to handle exceptions that are sent using `throw`.
```javascript
function connectDatabase() {
  throw new Error('connection error');
}
try {
  // normal execution code
} catch (err) {
  // exception handling code
} finally {
  // always called code
}
```

It is common to use the **fallback pattern** when using try catch blocks. This is where the primar feature path is in the try block and then there is some fallback method of still returning something in the catch block such as returning cached data when the network is not available.

## Destructuring
You can use destructuring to pull certain parts out of arrays or objects.
```javascript
const a = [1, 2, 4, 5];

const [b, c] = a;
console.log(b, c);
// OUTPUT: 1, 2

const [b, c, ...others] = a;
console.log(b, c, others);
// OUTPUT: 1, 2, [4,5]

const o = { a: 1, b: 'animals', c: ['fish', 'cats'] };

const { a, c } = o;
console.log(a, c);
// OUTPUT 1, ['fish', 'cats']

const { a: count, b: type } = o;
console.log(count, type);
// OUTPUT 1, animals
```

You can also provide default values for ones that do not exist.
```javascript
const { a, b = 22 } = {};
const [c = 44] = [];
console.log(a, b, c);
// OUTPUT: undefined, 22, 44
```

You can use destructuring to assign to existing variables as well.

## Scope
These are the four different types of scope:
1. Global - Visible to all code
2. Module - Visible to all code running in a module
3. Function - Visible within a function
4. Block - Visible within a block of code delimited by curly braces

The problem with `var` is that it always refers to variables in the global scope.

### This pointer
The `this` pointer is a reference to an object which contains the context of the current scope. If this scope is global, then it refers to the `globalThis` object. If it is in a function, then it refers to the object for which the function is a member. When referenced from an object it refers to that object.
*JavaScript strict mode will make it so the `this` pointer does not refer to `globalThis` in global functions and is instead `undefined`.*

A **closure** is a function and its surrounding state. Arrow functions inherit the `this` pointer from their creation context instead of from the object which they are a member of.
```javascript
globalThis.x = 'global';
const obj = {
  x: 'object',
  f: () => console.log(this.x),
};
obj.f();
// OUTPUT: global
```

But if we use the arrow function within a method of the object, then it will reference the `this` pointer of the method function which will be the object that it is a method to.

```javascript
globalThis.x = 'global';
const obj = {
  x: 'object',
  make: function () {
    return () => console.log(this.x);
  },
};
const f = obj.make();
f();
// OUTPUT: object
```

## Modules
Modules allow you to store pieces of code in separate files. You can `export` objects from the module and then `import` them in another module. You import modules into non-module scripts.
```javascript
// one file
export function alertDisplay(msg) {
  alert(msg);
}

// another file
import { alertDisplay } from './alert.js';
alertDisplay('called from main.js');
```
Module scripts have a separate scope from the global scope in other scripts. In order to use modules in the global scope of our HTML, we have to leak it through the window object using event handlers to setting properties of the window object. `window.btnClick = alertDisplay`.

## The Document Object Model (DOM)
The DOM creates an object representation of the HTML elements that a browser is using to render a page. It is exposed to external code so that you can dynamically manipulate the appearance of the page. You can access the DOM from JavaScript using the `document` pointer.

The DOM acts like an object hierarchy. You can iterate through the children of the `document` which will show all the highest level elements in the page using the `children` property.
You can use `document.querySelectorAll('selector')` to use a CSS selector to select HTML elements.
You can get the content of an element using the `textContent` property and you can get the actual text for the HTML content using the `innerHTML` property.

You can add elements by first creating them and then appending them to an existing element as so:
```javascript
function insertChild(parentSelector, text) {
  const newChild = document.createElement('div');
  newChild.textContent = text;

  const parentElement = document.querySelector(parentSelector);
  parentElement.appendChild(newChild);
}
insertChild('#courses', 'new course');
```
You remove elements by calling `removeChild` on the parent element.
```javascript
function deleteElement(elementSelector) {
  const el = document.querySelector(elementSelector);
  el.parentElement.removeChild(el);
}
deleteElement('#courses div');
```

You could change the HTML of an element using the `innerHTML` property, but you have to be careful because it is an attack vector. You have to make sure that the HTML you are injecting cannot be manipulated by the user.

### Event listeners
You can attach functions to any event that occurs on an element. These are called **event listeners**.
```javascript
const submitDataEl = document.querySelector('#submitData');
submitDataEl.addEventListener('click', function (event) {
  console.log(event.type);
});
```
Event listeners can be added from the HTML as well:
```javascript
<button onclick='alert("clicked")'>click me</button>
```

## Local Storage
Browsers have a `localStorage` API that allows you to persist data between HTML pages and sessions.
Here are the four main functions:
|Function|Meaning|
|---|---|
|setItem(name, value)|Sets a named item's value into local storage|
|getItem(name)|Gets a named item's value from local storage|
|removeItem(name)|Removes a named item from local storage|
|clear()|Clears all items in local storage|

Local storage supports values of type `string`, `number`, and `boolean`. You can convert objects to JSON to store them as a string in local storage. You can do this with the `JSON.stringify()` function and then convert it back to an object using `JSON.parse()`.

## Promises
A promise can be in one of three states at any point of time:
1. pending - Currently running asynchronously
2. fulfilled - Completed successfully
3. rejected - Failed to complete

We can use a promise to execute code asynchronously like so:
```javascript
new Promise((resolve, reject) => {
  // Asynchronously executed code here
});
```

The set the completed state of the promise, you call the function `resolve` (set to filfilled) or `reject` (set to rejected). You can pass a message into both of these functions when you call them.
There are then three functions, `then`, `catch`, and `finally`, which allow you to handle different outcomes of the promise. When the promise resolves, it will call the function passed to `then`. When the promise rejects, it will call the function passed to `catch`. The function passed to `finally` will always be called after either of those functions.
e.g.
```javascript
coinToss
  .then((result) => console.log(`Coin toss result: ${result}`))
  .catch((err) => console.log(`Error: ${err}`))
  .finally(() => console.log('Toss completed'));
```

As you can see, each of these functions returns the same promise allowing you to run another of the functions in the same statement.

## async & await
### await
You can use the `await` keyword in front of a promise to wait for it to finish executing. It then returns the result of the resolve or throws an error if the promise rejected.
```javascript
try {
  const result = await promise;
  console.log(`Promise result ${result}`);
} catch (err) {
  console.error(`Error: ${err}`);
} finally {
  console.log(`Always runs`);
}
```
`await` can only be used either at the top level of the JavaScript or inside a function that was created with the `async` keyword.

### async
The `async` keyword indicates that a function returns a promise. If the function does not return a promise, then one is automatically generated which is immediately resolved to the return value of the original function.

### In combination
Using async and await together allow more normal flow of code without the need of callbacks. It makes statements involving promises more concise.

```javascript
const httpPromise = fetch('https://simon.cs260.click/api/user/me');
const jsonPromise = httpPromise.then((r) => r.json());
jsonPromise.then((j) => console.log(j));
console.log('done');
// vs
const httpResponse = await fetch('https://simon.cs260.click/api/user/me');
const jsonResponse = await httpResponse.json();
console.log(jsonResponse));
console.log('done');
```

## Debugging
Beyond just using `console.log` to print out information on the status of your program at different points, you can also check the current value of variables in the console by simply entering the variable name and pressing enter.

You could also use a debugger in the browser. For chrome, you can go to the sources tab in the inspect view and then select the script you want to debug. You can then set breakpoints and refresh the browser so the script will start from the beginning with the breakpoints you have set.

# The Internet
Devices connected to the internet have a public IP address. Symbolic names or domain names can refer to one or more IP addresses. You can use `traceroute` to see the jumps that your connection makes to reach some destination. This path can change dynamically if some devices fail or go offline.

## TCP/IP
There is the TCP/IP model which is used for sending data across the internet. Its application layer represents user functionality like HTTP, SMTP, FTP, SSH, and IRC. It has a transport layer which actually breaks the information into chunks to sent over the network and internet.
Simple layout:
| Layer       | Example         | Purpose                               |
| ----------- | --------------- | ------------------------------------- |
| Application | HTTPS           | Functionality like web browsing       |
| Transport   | TCP             | Moving connection information packets |
| Internet    | IP              | Establishing connections              |
| Link        | Fiber, hardware | Physical connections                  |

# Web Servers
This is a server that accepts connection over the HTTP application protocol. It used to be that entire servers would be dedicated to one web server application. Now the servers can run multiple web server applications among other things.
## Web Services
Different *web services* can be hosted on separate ports and then a *web service gateway* can direct the client to one of the ports based on their request. The web service gateway is just hosted on the HTTPS port 443.
**Microservices** are services which serve a single functional purpose. They are useful because they can be essentially replicated to run in many virtual environments so that you can serve many users at once.
The **serverless** concept is basically that abstract away the server so that you are just mapping a request directly to a function through the web service gateway.
## The Frontend
All the files that are running on the browser for a website are the **frontend**. Any requests it makes to the web server are through the HTTPS protocol.
To make web services requests from the JavaScript in the browser, you use the `fetch` function built into the browser.
## The Backend
The functionality provided by web services running on a web server are the **backend**. The functions provided by a web service that you can send `fetch` requests to are called **endpoints**. They might also be called APIs or a group of them might be called an API. A backend web service can also make `fetch` requests to other web services. 

# Domain names
You can use the console command `dig` to find the ip addresses associated with a domain name.
A root domain is a seconary level domain and a top level domain. Top level domains are things like `com`, `edu` and `net`. Example root domain: `amazon.com`. After that, there are subdomains of which there can be multiple. Like the `cs` in `cs.byu.edu`. Or you could have `react.simon.cs260.click`.
You can use the `whois` command to get information about a domain name.

There are certain DNS database records that allow you to map domain names to IP addresses. Two main records: `A` records and `CNAME` records. `A` records map a domain name straight to an IP address. `CNAME` records map one domain name to another domain name. A domain name "alias".

In the pipeline for DNS information, there is a cache in the browser and a cache in the DNS. If the DNS doesn't have the name in the cache, then it will request it from the `authoritative name server`. When you are updating the information for your domain name, you can set the `time to live` (`TTL`) which will tell caches how long they should last.

# URL
"The Uniform Resource Locator (URL) represents the location of a web resource."
The syntax is as follows:
```
<scheme>://<domain name>:<port>/<path>?<parameters>#<anchor>
```
The only required parts here are the scheme and domain name.
The *scheme* is the protocol that will be used to request the resource such as `HTTPS`, `HTTP`, `FTP`, etc.
The *path* doesn't have to be an actual location on the file system of the destination. It is used by the server to locate the resource.
The *parameters* are also sometimes called the *query string*. The parameters are a list of key value pairs. Key and value are separated by `=` and parameters are separated by `&`. e.g.
```
filter=names&highlight=intro,summary
```
The *anchor* is some kind of subpath located within the resource, for example a header to scroll to.

## URL, URN, URI
A Uniform Resource Name (URN) does not contain location information and just uniquely identifies a resource. A Uniform Resource Identifier (URI) can refer to either a URL or URN. It is just more general.

# Ports
Ports allow a single device to host multiple types of services over the network (e.g. HTTP, HTTPS, FTP, SSH).
The IANA has a list of standard port numbers for certain types of services. Ports 0 to 1023 are reserved for standard protocols.

# HTTP
This is what the web uses for communication.
HTTP requests have this syntax:
```http
<verb> <url path, parameters, anchor> <version>
[<header key: value>]*
[

  <body>
]
```
The headers and body are optional, and the body is separated from the headers by two newlines.

Response syntax:
```http
<version> <status code> <status string>
[<header key: value>]*
[

  <body>
]
```

## Verbs
| Verb    | Meaning                                                                                                                                                                                                                                                  |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GET     | Get the requested resource. This can represent a request to get a single resource or a resource representing a list of resources.                                                                                                                        |
| POST    | Create a new resource. The body of the request contains the resource. The response should include a unique ID of the newly created resource.                                                                                                             |
| PUT     | Update a resource. Either the URL path, HTTP header, or body must contain the unique ID of the resource being updated. The body of the request should contain the updated resource. The body of the response may contain the resulting updated resource. |
| DELETE  | Delete a resource. Either the URL path or HTTP header must contain the unique ID of the resource to delete.                                                                                                                                              |
| OPTIONS | Get metadata about a resource. Usually only HTTP headers are returned. The resource itself is not returned.                                                                                                                                              |

## Status codes
- 1xx - Informational.
- 2xx - Success.
- 3xx - Redirect to some other location, or that the previously cached resource is still valid.
- 4xx - Client errors. The request is invalid.
- 5xx - Server errors. The request cannot be satisfied due to an error on the server.

Common codes:
| Code | Text                                                                                 | Meaning                                                                                                                           |
| ---- | ------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| 100  | Continue                                                                             | The service is working on the request                                                                                             |
| 200  | Success                                                                              | The requested resource was found and returned as appropriate.                                                                     |
| 201  | Created                                                                              | The request was successful and a new resource was created.                                                                        |
| 204  | No Content                                                                           | The request was successful but no resource is returned.                                                                           |
| 304  | Not Modified                                                                         | The cached version of the resource is still valid.                                                                                |
| 307  | Permanent redirect                                                                   | The resource is no longer at the requested location. The new location is specified in the response location header.               |
| 308  | Temporary redirect                                                                   | The resource is temporarily located at a different location. The temporary location is specified in the response location header. |
| 400  | Bad request                                                                          | The request was malformed or invalid.                                                                                             |
| 401  | Unauthorized                                                                         | The request did not provide a valid authentication token.                                                                         |
| 403  | Forbidden                                                                            | The provided authentication token is not authorized for the resource.                                                             |
| 404  | Not found                                                                            | An unknown resource was requested.                                                                                                |
| 408  | Request timeout                                                                      | The request takes too long.                                                                                                       |
| 409  | Conflict                                                                             | The provided resource represents an out of date version of the resource.                                                          |
| 418  | [I'm a teapot](https://en.wikipedia.org/wiki/Hyper_Text_Coffee_Pot_Control_Protocol) | The service refuses to brew coffee in a teapot.                                                                                   |
| 429  | Too many requests                                                                    | The client is making too many requests in too short of a time period.                                                             |
| 500  | Internal server error                                                                | The server failed to properly process the request.                                                                                |
| 503  | Service unavailable                                                                  | The server is temporarily down. The client should try again with an exponential back off.                                         |

## Headers
Headers are used to include metadata about requests or responses. Data about security, caching, data format, etc.

## Cookies
Cookies are generated by the server and given to the client to cache. Then the client will pass the cookie to the server in subsequent requests.
Server giving the client a cookie:
```http
HTTP/2 200
Set-Cookie: myAppCookie=tasty; SameSite=Strict; Secure; HttpOnly
```
Client sending its cookie to the server:
```http
HTTP/2 200
Cookie: myAppCookie=tasty
```

# Express
Express is a node package which provides an easy way to create web services.

You can create a web application using
```javascript
const express = require('express');
const app = express();
app.listen(8080);
```

and then you call functions on `app` with the same name as the HTTP verbs in order to route requests through your functions.
```javascript
app.get('/store/provo', (req, res, next) => {
  res.send({name: 'provo'});
});
```

If there are multiple functions which have the same match, then the one that was added first will be called and given `next` as a reference to the next match. The route paths can actually also be regular expressions.

## Middleware
**Middleware** is componentized pieces of functionality. A **mediator** determines the order of execution of middlware components to come up with a result. Express is a mediator.
You can use built-in or third party middleware. `app.use(express.static('public'));` would add middleware which would host static files in the public directory. If you made a request with no path, it would serve index.html from the public directory.

# Same Origin Policy and Cross Origin Resource Sharing
SOP makes it so that JavaScript can't make requests to a domain different than the one that it is currently viewing. This prevents attackers from having a fake website that just retrieves that real one from the real website.

CORS makes it possible to still making requests to other domains because it allows the server receiving the request to specify which origins are allowed. In the response, the browser compares the origin of the request to the allowed origins returned by the server and if they do not match, then it discards the response and errors.

Request:
```http
GET /api/auth/login HTTP/2
Host: byu.instructure.com
Origin: https://byu.iinstructure.com
```
Response:
```http
HTTP/2 200 OK
Access-Control-Allow-Origin: https://byu.instructure.com
```
and the browser discards it.

Since it is the browser that is protecting the user, the attacker could still just run the request through a proxy which would allow them to bypass the check. For this reason, the host website must implement some protection against attackers using nefarious requests to their platform.

# Process Manager 2
If you want something to run even after you close your console, you need to register it as a *daemon*. Daemon just means something that is always there running in the background. We use PM2 to start and stop processes running in the background.

## Common Commands
| Command                                                    | Purpose                                                                          |
| ---------------------------------------------------------- | -------------------------------------------------------------------------------- |
| **pm2 ls**                                                 | List all of the hosted node processes                                            |
| **pm2 monit**                                              | Visual monitor                                                                   |
| **pm2 start index.js -n simon**                            | Add a new process with an explicit name                                          |
| **pm2 start index.js -n startup -- 4000**                  | Add a new process with an explicit name and port parameter                       |
| **pm2 stop simon**                                         | Stop a process                                                                   |
| **pm2 restart simon**                                      | Restart a process                                                                |
| **pm2 delete simon**                                       | Delete a process from being hosted                                               |
| **pm2 delete all**                                         | Delete all processes                                                             |
| **pm2 save**                                               | Save the current processes across reboot                                         |
| **pm2 restart all**                                        | Reload all of the processes                                                      |
| **pm2 restart simon --update-env**                         | Reload process and update the node version to the current environment definition |
| **pm2 update**                                             | Reload pm2                                                                       |
| **pm2 start env.js --watch --ignore-watch="node_modules"** | Automatically reload service when index.js changes                               |
| **pm2 describe simon**                                     | Describe detailed process information                                            |
| **pm2 startup**                                            | Displays the command to run to keep PM2 running after a reboot.                  |
| **pm2 logs simon**                                         | Display process logs                                                             |
| **pm2 env 0**                                              | Display environment variables for process. Use `pm2 ls` to get the process ID    |

## Creating a new web service
If we wanted to host a new web service using PM2, we could create a new folder with the necessary files under ~/services/ and then use
```bash
pm2 start index.js -n serviceName -- 5000
pm2 save
```
This would make PM2 run the index script in the background with the name `serviceName` and parameters to the script following `--`.

# Development and Production Environments
For commercial applications, you always want to have a separation between your development and production environments. For this class, our development environment is our local files on our computers and our production environment is our AWS server. The deployment of our application to the production environment should happen from an automated continuous integration (CI) processes.
The process of deploying a project is often complex and creating a script will help you avoid human error and encourage you to iterate faster.

# Uploading files
You can use a form with an input element of type file. The frontend can then send a request to an upload service which is handled by the `Multer` NPM package. Multer can restrict the size of uploads a return an error if they are too large.

```javascript
const upload = multer({
  storage: multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
      const filetype = file.originalname.split('.').pop();
      const id = Math.round(Math.random() * 1e9);
      const filename = `${id}.${filetype}`;
      cb(null, filename);
    },
  }),
  limits: { fileSize: 64000 },
});

app.post('/upload', upload.single('file'), (req, res) => {
  if (req.file) {
    res.send({
      message: 'Uploaded succeeded',
      file: req.file.filename,
    });
  } else {
    res.status(400).send({ message: 'Upload failed' });
  }
});
```

# Storage Services
Much of the time a database will actually be overkill and we can get away with just using a storage service which stores files. 

## AWS S3
This is a common service and has these advantages:
It has unlimited capacity
1. You only pay for the storage that you use
1. It is optimized for global access
1. It keeps multiple redundant copies of every file
1. You can version the files
1. It is performant
1. It supports metadata tags
1. You can make your files publicly available directly from S3
1. You can keep your files private and only accessible to your application