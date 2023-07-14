// Key note: to optimized code is to write predictable code for humans/machines
function Animal(x, y) {
    this.x = x;
    this.y = y;
}

// Instantiating object properties in the same order, improves compiler efficiency
// as the compiler knows that the objects share the same hidden class under the hood
const obj1 = new Animal(1, 2);
const obj2 = new Animal(3, 4);

// console.log(`${obj1.a} ${obj1.b}`); // o/p-> undefined undefined
console.log(obj1);
console.log(obj2);

// But its not the same case, when change the order 
// as it assumes the objects have two different classes
obj1.a = 30;
obj1.b = 100;
obj2.b = 30;
obj2.a = 100;
// this slows down the process internally

// To make the code more effecient, one has to either assign the objects through a
// constructor or in order!

console.log(`${obj1.a} ${obj1.b}`);
console.log(obj1);

// The same goes with deleting the objects or its properties
// as it change the order of the hidden classes
delete obj1.a;
console.log(obj1);