function asynchronous_callback() {
    console.log(`🐇 finished!`);
}
// console.log(`🐇 finished!`);
// setTimeout(asynchronous_callback, 1000);

setTimeout(() => {console.log(`🐇 finished!`)}, 1000);

console.log(`🐢 finished!`);