const mongoose = require("mongoose");

// The data can be persisted in server.js of the project API
const MONGO_URL = 'mongodb+srv://NASA-API:Harshith98@cluster0.lgbfufw.mongodb.net/NASA-database?retryWrites=true&w=majority';
// The cluster resides at this address: cluster0.lgbfufw.mongodb.net

// We can use the handlers anywhere in the file as long as mongoose is required by the server file
mongoose.connection.once('open', () => { // .connection is an event emitter of the mongoose object
    console.log('MongoDB connection ready!');
}); // .once feature is similar to .on event emmiter which triggers the callback only once

mongoose.connection.on('error', (err) => {
    console.error(`There was an error while connecting to the database: ${err}`);
});

async function mongoConnect() {
    await mongoose.connect(MONGO_URL); /* , { // the .connect(url) returns a promise
        // these parameters are usually set while connecting to MongoDB using mongoose
        // without doing so will lead to deprication warnings in the console
        useNewUrlParser: true,
        // useFindAndModify: false,
        // useCreateIndex: true,
        useUnifiedTopology: true,
    }); // these options are used by the MongoDB driver that mongoose uses to connect to the database
    // MongoDB driver is the official API that node uses to connect and communicate to MongoDB database
    the new version 6 and higher of mongoose uses these options by default */
}

module.exports = { 
    mongoConnect,
}