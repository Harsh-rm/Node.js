const http = require('http');

const PORT = process.env.PORT || 8000;

// console.log(PORT);

const server = http.createServer(/*Somthing goes here*/);

server.listen(PORT, () => {
    Console.log(`Listening on PORT ${PORT}`);
});

// const express = require('express');

// const app = express();
// app.listen();