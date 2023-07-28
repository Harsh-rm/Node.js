const http = require('http');
// importing the http module from commonJS in Node.js as an object
const port = 3000; 
// setting up a port to access the server 
// and right application by using the IP address

const server = http.createServer((req, res) => {
    // (req, res) => {} is a callback function => listener
    // this is a shorthand for server.on('request', // callback (req, res) => {});
       res.writeHead(200, {
        'content-type': 'application/json',
       });
    // the writeHead method is used to send a response header to the request
    // with first parameter as status code, and second parameter as an object
    // which could be a list of all response headers
       res.end(JSON.stringify({
        id: 1,
        name: 'John Doe',
       }));
    // the end method is used at the end of each response to a request
});

server.listen(port, () => {
    console.log(`Listening on port ${port}...`);
}); // local machine IP address: 127.0.0.1 => localhost
// cmd: ip addr show