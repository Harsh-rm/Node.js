// Global variable
var a = 1;
var b = 2;
var c = 3;
// creating multiple global variables and adding nested objects 
// takes more and more space in the memory

// event listeners
var element = document.getElementById('button');
element.addEventListener("click", onClick);
// adding multiple event listeners and not using them
// takes up space in the background and eventually cause a memory leak

// set interval - https://developer.mozilla.org/en-US/docs/Web/API/setInterval
setInterval(() => {
    // referencing objects...
})
// unless this function is not stopped or cleared
// the referenced objects will create a memory leak
// example of this is soundcloud.com
// https://developers.soundcloud.com/blog/garbage-collection-in-redux-applications