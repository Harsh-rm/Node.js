// call stack && memory heap
const num = 610; // allocate memory for variable num
const string = 'some text'; // allocate memory for the string
const human = { // allocate memory for the object and its values
    first: 'Andrei',
    last: 'Neagoie'
}

function subtractTwo(num) {
    return num - 2;
}

function calculateRandom() {
    const sumTotal = 4 + 5;
    return subtractTwo(sumTotal);
}

console.log(calculateRandom());

var garbage_collection = {
    reference_obj1: 'mark_needed',
    reference_obj2: 'sweep_unneeded'
}

console.log(garbage_collection);

// new object is created & the old object is deleted
garbage_collection = "empty"; 

console.log(garbage_collection);