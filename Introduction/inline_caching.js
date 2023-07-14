function findUser(user) {
    return `found ${user.firstname} ${user.lastname}`
}

const userData {
    firstname: 'John'
    lastname: 'Hopkins'
}

findUser(userData);

// if the same object is being called multiple times, then
// Optimized compiler code - chache it in 1 line
// "found John Hopkins"