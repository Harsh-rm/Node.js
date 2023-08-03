//Performance Enhancement script
const express = require('express');

const app = express();

function delay(duration) {
    const startTime = Date.now();

    while(Date.now() - startTime < duration) {
        //event loop is blocked...
    }
}

// Real-life blocking functions
/*
    JSON.stringify({}) => returns a string representation of the object
    JSON.parse("{}") => returns an object representation of the stringified object
    calling these functions blocks the event loop of the server for a short period 
    in large and complex programs this time can sprial out control and cause large delays

    [5,1,3,2,4].sort() => Arrays.sort() function blocks the event loop, which would cause delays for large arrays

    There are certain functions in node's built-in crypto module which are designed to execute slowly
    so that it takes longer for hackers to guess a password or steal data ex: .pbkdf2() .scrypt() 
    are password based key derivation functions that store user passwords in a hash format - https://nodejs.org/api/crypto.html

    Research based on Response times in the Web Applications - https://www.nngroup.com/articles/response-times-3-important-limits/
    Engagement based on response times - https://www.speedcurve.com/blog/web-performance-monitoring-user-engagement/
*/

app.get('/', (req, res) => {
    res.send('Performance example');
});

app.get('/timer', (req, res) => {
    //dealy the response
    delay(9000);
    res.send('Ding ding ding!');
})

app.listen(3000);