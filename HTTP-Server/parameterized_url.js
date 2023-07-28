const http = require('http');

const server = http.createServer();

const port = 3000;

const friends = [
    {
        id: 0,
        name: 'Sri Hari'
    },{
        id: 1,
        name: 'Christos'
    },{
        id: 2,
        name: 'Anirudh'
    }
];

server.on('request', (req, res) => {
    const items = req.url.split('/');
    // ex: // /friends/2 => ['', 'friends', '2']
    // this is one way of parsing through the url
    if(req.method === 'POST' && items[1] === 'friends') {
        req.on('data', (data) => {
        // the data passed on the readble stream such as request is passed in as a node buffer object
        // which is collection of raw bytes that is being sent to the server as a request from the browser
            const friend_str = data.toString(); // converting data stream to string
            console.log('Node buffer object: ', data);
            console.log('http request to POST data: ', friend_str);
            console.log(JSON.parse(friend_str));
            friends.push(JSON.parse(friend_str));
        });
        req.pipe(res); //the pipe method handles data streams which can be used to echo data
        // from a readable source to a writable destination
        // This Post method has to read the data passed on by the the http request
    }

    else if(req.method === 'GET' && items[1] === 'friends') {
    // /freiends is a collection and the end point for our functionality
        res.statusCode = 200;
        res.setHeader('content-type', 'application/json');
        
        if(items.length === 3) {
            const friend_idx = Number(items[2]); 
            // the shorthand operation is +items[2] to convert it to integer
            res.end(JSON.stringify(friends[friend_idx]));
        } 
        
        else {
            res.end(JSON.stringify(friends));
        }
    } 
    
    else if(req.method === 'GET' && items[1] === 'messages') {
    // similarly /messages is also an end point this functionality is known as routing
        res.writeHead(200, 
            'content-type', 'text/html');
        res.write('<html>');
        // we can write our html code to the stream piece by piece as text
        res.write('<body>');
        res.write('<ul>'); // unordered list
        res.write('<li> Hello Sri Hari! </li>'); //list element
        res.write('<li> What are your thoughts on HTML and routing? </li>');
        res.write('</ul>');
        res.write('</body>');
        res.write('</html>');
        res.end(); // we are no longer writing to this stream
    } 
    
    else{
        res.statusCode = 404;
        res.end();
    }

});

server.listen(port, () => {
    console.log(`Listening on port ${port}...`);
})