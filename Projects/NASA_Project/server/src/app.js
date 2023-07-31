const path = require('path');
const express = require('express');
const cors = require('cors');

const planetsRouter = require('./routes/planets/planets.router');

const app = express();
// any middleware and route handlers attached to this app object
// will respond to the requests coming into the server

app.use(cors({
    origin: 'http://localhost:3000',
}));

app.use(express.json());
// this middleware will parse any json data incoming from the body of the request
app.use(express.static(path.join(__dirname, '..', 'public', )));

app.use(planetsRouter);
// app.listen();
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, ''));
});

module.exports = app;