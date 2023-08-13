const mongoose = require('mongoose');

const launchesSchema = new mongoose.Schema({ // pass the definition of the schema as an object
    flightNumber: {
        type: Number,
        required: true,
    },
    mission: {
        type: String,
        required: true,
    },
    rocket: {
        type: String,
        required: true,
    },
    launchDate: {
        type: Date,
        required: true,
    },
    target: {
        type: String,
    },
    customers: [ String ],
    upcoming: {
        type: Boolean,
        required: true,
    },
    success: {
        type: Boolean,
        required: true,
        default: true,
    },
});

module.exports = mongoose.model('Launch', launchesSchema);
/*  this statement is called compiling the model - which is essentially creating a mongoose object
    which can be used to create and read documents in the launches collection
    
    the name convention of the collection should singular
    as the model connects launchesSchema with the "launches" collection
    by making it lower cased and plural 
*/