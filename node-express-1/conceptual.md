### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
with ECMAScript2017 (ES8) the easiest way to manage asychronous code is using await keyword with an async function.  Additionally it is possible to use 3rd party libraries like Axios to help mabnage asychronous code. 

- What is a Promise?
A promise is an object returned by async functions that represents the completion of an async function.  The three states of a javascript promise are pending, fuilfilled or rejected. 

- What are the differences between an async function and a regular function? Async functions always return a promise.  Regular functions return the value specified by the return function. Async functions essentially pause at the await keyword until the promise is fulfilled or rejected. 

- What is the difference between Node.js and Express.js? Node.js is a runtime environemnt that leverages JavaScript.  Express.js is a framework for building web applications. Express.js manages a lot of the low level functions necessary for web applications making development a lot easier. 

- What is the error-first callback pattern?  in Express error-first callback function is a middleware function with four arguments.  When there are four arguments the error is always the first argument (followed by request, response and next). 

- What is middleware? Middleware is a function that acts between the request and the response.  in Node.js middleware functions require the use of the next() function otherwise they are left hanging. 

- What does the `next` function do? next() allows the next middleware function to proceed.  Or next with an argument will always mean there is an error. 

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc).  The only issue I see is that these functions will be called seirially with no error handling.  Serially, meaning the system will wait until the elie promise is fullfilled before calling joel.  If there are errors with elie that means neither joel nor matt will complete (or even be called).  So an error in any of the three will mean the system hangs. To that point there is no error handling.  It would be better to run a promise.all with error handling (try/catch).  That way all three fire off immediately and if there is an issue with any one function the system can still continue. 

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```
