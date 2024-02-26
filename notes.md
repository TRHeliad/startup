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

# Domain names
You can use the console command `dig` to find the ip addresses associated with a domain name.
A root domain is a seconary level domain and a top level domain. Top level domains are things like `com`, `edu` and `net`. Example root domain: `amazon.com`. After that, there are subdomains of which there can be multiple. Like the `cs` in `cs.byu.edu`. Or you could have `react.simon.cs260.click`.
You can use the `whois` command to get information about a domain name.

There are certain DNS database records that allow you to map domain names to IP addresses. Two main records: `A` records and `CNAME` records. `A` records map a domain name straight to an IP address. `CNAME` records map one domain name to another domain name. A domain name "alias".

In the pipeline for DNS information, there is a cache in the browser and a cache in the DNS. If the DNS doesn't have the name in the cache, then it will request it from the `authoritative name server`. When you are updating the information for your domain name, you can set the `time to live` (`TTL`) which will tell caches how long they should last.