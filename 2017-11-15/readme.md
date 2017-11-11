# More JS

## Imperative vs. Declarative

In the last session we finished by making a distance calculator in vanilla JavaScript. We found that it was pretty easy to repeat ourselves. For example, when doing the initial render of the list, we wrote code to create a `li` element, fill it with content and add it to the list. We also wrote code to tot up the distances. The problem came when we added a form to let a user add another trip. All that code was needed again for this feature.

For the `li` appending feature, we wrote a helper function that added the element to the `ul`. As each individual route didn't need to know about the previous data, we could do that.

For the total distance feature, we needed all the data to make the calculation so we couldn't use an appending helper function. We needed to re-render the total each time, hence we wrote a 'render' function that destroyed the old data and put in new data.

For page load, we could run the helper function for each of the inital routes and call the render funciton once. Then for each form submittion, we called the helper function once and the render function once. We moved much of the duplication into functions (which is great), but we still have duplication for the helper function calls.

Duplication is an opportunity for errors to creep in, especially as a program expands. Say another developer came along and added a feature in a few months time that needed to add routes from a real-time database. If they didn't realise they had to call two seperate functions to force a re-render, their could be problems.

This is an imperative programming style. This 'programming paradigm' is pretty common, it's often how we start out developing simple programs. jQuery is regularly used in an imperative fashion: make this `button` yellow, fade this `div` out, change this text to say 'hello'. We use statements to change the programs state, and we specify *how* the program operates.

Constrast this to the declarative paradigm where we describe the logic of the program without specifying *how* it should run. We can achieve this by de-coupling the inputs and outputs from the state. If the outputs always reflect the current state, we only need to worry about inputting to the state. So when our hypothetical future developer comes along, all they do is add another input to the state and the outputs will react to any changes.

## Distance calculator in Vue.js

To make this clearer, I'm going to show a rewrite of our distance calculator in Vue.js, a framework that encourages you to be declarative.

## JS shorthand operators

```javascript
var a = 1

a++ // Eqivalent to: a = a + 1

a-- // Eqivalent to: a = a - 1

a += 2 // Eqivalent to: a = a + 2

a -= 2 // Eqivalent to: a = a - 2

var b = 'trys'
!!b // This is the boolean representation of 'b'. In this case, !!b === true
```

### ||

```javascript
var c = d || 'default'

// Imagine: 
var c;
if (d) {
  c = d
} else {
  c = 'default'
}
```
--

This is great for falling back to defaults and is regularly used in functions for default arguments.

### &&

```javascript
var a = 0
var b = 1
var c = a && b // 1

// Imagine: 
var c
if (!a) {
  c = b
} else {
  c = a
}
```

`&&` can be used before function calls to check variable/function existence before making the call:

```javascript
var map = false
map && renderMap(map) // renderMap doesn't get called unless 'map' is truthy
```

### Ternary
```javascript
var a = b ? c : d;

// Imagine:
var a
if (b) {
  a = c
} else {
  a = d
}
```


## A module/singleton pattern

```javascript
var Namespace = (function () {
  "use strict";
  return {
    Initialise: function () {
      Namespace.Menus();
    },

    Menus: function () {
      // Do menu things
    }

  };
}());

$(Namespace.Initialise());
```

Sidenote: `$(fn)` is equivalent to `$(document).ready(fn)`.

[You might not need jQuery...](http://youmightnotneedjquery.com/)

```javascript
(function(fn) {
  if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
})(Namespace.Initialise)
```

## Array methods

