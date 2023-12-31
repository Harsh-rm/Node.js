// the src folder contains all the source code and it
// separates this from the configuration files in the project folder
const http = require('http');

require('dotenv').config();

const app = require('./app');
const { mongoConnect } = require('./services/mongo');
const { loadPlanetsData } = require('./models/planets.model');
const { loadLaunchesData } = require('./models/launches.model');

const PORT = process.env.PORT || 8000;
// console.log(PORT);

const server = http.createServer(app);
// createServer() takes a request listening function (event listener) as an argument
// which responds to all the incoming requests to the server

async function startServer() {
    await mongoConnect();
    await loadPlanetsData();
    await loadLaunchesData();

    // now we can use the server object to start listening on the localhost's port
    server.listen(PORT, () => { // => callback function used as a response
        console.log(`Listening on PORT ${PORT}...`);
    });
}

startServer();