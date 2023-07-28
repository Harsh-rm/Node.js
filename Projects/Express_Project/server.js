// imports
const express = require('express');

const path = require('path'); // used for .join function

const friendsRouter = require('./routers/friends.router');
const messagesRouter = require('./routers/messages.router');

// creating object from external import of express
const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

const PORT = 3000;

// writing middleware with the help of use function 
// and next method to call the next handlers
app.use((req, res, next) => {
    const start = Date.now(); // this stores the time in milliseconds
    next();
    // flow of execution happens from this middleware to the next middleware
    // and the return value is returned to this function from that next middleware
    const delta = Date.now() - start;
    console.log(`${req.method} ${req.baseUrl}${req.url} ${delta}ms`);
});

app.use('/site', express.static(path.join(__dirname, 'public')));
// The path specified in the static file middleware is relative 
// to where the (node application launched) server was started
// therefore we need to use path.join()

app.use(express.json());

app.get('/', (req, res) => {
    res.render('index', {
        // calling render defaults to the layout handlebars
        title: 'Social Network',
        caption: 'My profile picture!',
        //called trailing comma
    });
});
app.use('/friends', friendsRouter);
app.use('/messages', messagesRouter);

app.listen(PORT, () => { 
    console.log(`listening on port ${PORT}...`);
});