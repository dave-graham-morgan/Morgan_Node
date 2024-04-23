### Conceptual Exercise

Answer the following questions below:

- What is React? When and why would you use it? answer: react is a javascript framework that makes building web applications easier.
- react makes it easy to change data on the page without having to re-render the entire page.  Additionally the smaller 
- components mean applications get the beneift of encapsulation. 

- What is Babel? Babel converts jsx into actual javascript

- What is JSX? jsx is an html 'like' interface that gets transpiled into javascript

- How is a Component created in React? just create a new file with a .jsx extention, import react, export the component and then render it

- What are some difference between state and props? props are what are passed to react components.  Props can set default values,
- can be variables used by the component etc.  State is what react uses to manage what renders in the dom

- What does "downward data flow" refer to in React? data can only flow from parent components to child components.  If a child
- component needs to affect a parent component the parent must pass the child a callback that can be used by the child to affect the parent.  I think

- What is a controlled component? this would be a component that manages the state of its imput elements through Reacts state mechanism.
- 

- What is an uncontrolled component? these would be components that manage their own internal state instead of being controlled by 
- react's state mechanism. 

- What is the purpose of the `key` prop when rendering a list of components? key prop is used to uniquely identify each component.  The 
- browser will bitch at you if you don't set it on each component. 

- Why is using an array index a poor choice for a `key` prop when rendering a list of components? because the array can change (for example sorted) which would 
- jack up the key to component reference.  

- Describe useEffect.  What use cases is it used for in React components? Use Effect is a hook meant to control how often a function(s) 
- are executed.  They can be set to run once on page load or listen for something and update when that thing changes. 

- What does useRef do?  Does a change to a ref value cause a rerender of a component? useRef access dom elements directly.  updating a ref
- does not trigger a re-render.

- When would you use a ref? When wouldn't you use one?  You use useRef to access uncontrolled componenets directly from the DOM. I think
- we're not supposed to use them all the time because that's not 'reacty'.  not sure. 

- What is a custom hook in React? When would you want to write one? A custom hook is one you make yourself.  Traditionally, 
- custom hooks follow the useX naming convention.  You would write one to make your code more efficient, to reduce boilerplate
- code etc. 
