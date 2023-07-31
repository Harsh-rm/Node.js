//promise is an object that may produce a single value some time in the future
// either a resolved value or a reason that it's not resolved (rejected)
// a promise may be in one of 3 possible states: fulfilled, rejected, or pending
const promise = new Promise((resolve, reject) => {
    if (true) {
        resolve('It worked');
    } else {
        reject('It broke');
    }
})
//It can be assigned to a variable and be used to perform asynchronous operations
// it is part of the non blocking asynchronous code in javascript

promise
    .then(result => result + '!')
    .then(result2 => {
        throw Error;
        console.log(result2);
    })
    .catch(() => console.log('catch() catches the errors!'))
    .then(result2 => console.log(result2 + '??'))
    .then(result2 => {console.log(result2 + '{} what is the difference??')})
    .then(result2 => result2 + '??')
    .then(result3 => {
        throw Error;
        return result3 +  '?';
    })
    // .catch(() => console.log('catch() catches the errors!'))
    // The return value of this promise is rejected, 'It broke'

promise
    .then(result => result + '!')
    .then(result2 => console.log(result2 + 'add this result to the terminal')) 
    .then(result3 => result3 +  '??')
    .then(result4 => {return result4 + '???'})
    // the console.log() overrides the return result value of the promise object after it
    // also the final retrun value of the promise is different
    // as there is an error after this statement in result4
    .catch(() => console.log('catch() catches the errors!'))
    // This statement catches errors only from the promises above it
    .then(result4 => {
        throw Error;
        console.log(result4 + 'this is result 4');
    })
    .catch(() => console.log('catch() catches the errors!'))
    .then(result5 => result5 + '??')
    .then(() => console.log('this is chaining promises, an alternate method to callback pyramid of doom'))
    // The console.log() without a result value overrides the final return value of the promise object 
    // i.e Promise {<fulfilled>: undefined??} is not printed instead Promise {<fulfilled>: undefined}
    // .then(result6 => result6 + '??') // adding this statement will change the final return value of the promise
    // i.e Promise {<fulfilled>: undefined??}

promise
    .then(result => result + '!')
    .then(result2 => console.log(result2 + 'add this result to the terminal')) 
    .then(result3 => result3 +  '??')
    .then(result4 => {return result4 + '???'})
    // here all the results are returned as there are no errors

const promise1 = new Promise((resolve, reject) => {
    if (true) {
        resolve('It worked');
    } else {
        reject('It broke');
    }
})
const promise2 = new Promise((resolve, reject) => { 
    setTimeout(resolve, 100, 'HIII')
})

const promise3 = new Promise((resolve, reject) => {
    setTimeout(resolve, 1000, 'POOKIE')
})

const promise4 = new Promise((resolve, reject) => {
    setTimeout(resolve, 5000, 'Is it me you are looking for?')
})

Promise.all([promise1, promise2, promise3, promise4])
    .then(values => {
        console.log(values);
    })