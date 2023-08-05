const { 
    isMainThread,
    workerData,
    Worker,
} = require('worker_threads');

// new Worker(__filename); // points to the current file's path 
// this statement will create worker threads until no more threads can be produced

if (isMainThread) {
    console.log(`Main thread! Process ID: ${process.pid}`);

    new Worker(__filename, {
        workerData: [5, 1, 4, 2, 3]
    }); // when the main thread creates a new Worker() the workers executes the
    new Worker(__filename, {
        workerData: [6, 9, 7, 8, 0]
    }); // same thread in parellel => worker executes the else part of the thread
} else {
    console.log(`Worker thread! Process ID: ${process.pid}`);
    console.log(`${workerData} sorted in ascending order ${workerData.sort()}`);
}
// o/p
// Main thread! Process ID: 8800
// Worker thread! Process ID: 8800
// Worker thread! Process ID: 8800