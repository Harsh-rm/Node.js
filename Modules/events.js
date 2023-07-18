// Observer Pattern
const EventEmitter = require('events');
const celebrity1 = new EventEmitter();

//Subscribe to the celebrity events for Observer 1
celebrity1.on("Race", (result) => {
    if(result === 'win') {
        console.log("Congratulations!");
    }
    if(result === "lost") {
        console.log("Better luck next time!");
    }
    // else{
    //     console.log("Good Race!");
    // }
});

//Subsciber 2 for the celebrity events
celebrity1.on("Race", (result) => {
    if(result === 'win') {
        console.log("I have seen better!");
    }
    if(result === "lost"){
        console.log("Boo! Not worth the subscription.");
    }
    // else{
    //     console.log("Good Race!");
    // }
});

process.on('exit', (code) => {
    console.log('Process exit event with code: ', code);
});

celebrity1.emit("Race", "win");
celebrity1.emit("Race", "lost");