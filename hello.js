// JavaScript is a single threaded programming language
// and uses only one call stack
const mission = 'learn'

if(mission === 'learn') {
    console.log("Our mission is to " + mission + " Node!");
} else {
    console.log(`Is this activity better than to ${mission}`);
}
// classic example of a single call stack running until it is returned
// is the alert() function
alert("Hello!") // This mimics a long running javascript engine
// the javascript runtime handles this problem