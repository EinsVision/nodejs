var fs = require('fs');

// read file Sync
console.log('first');
var result = fs.readFileSync('sample.txt', 'utf-8');

console.log(result);
console.log('final');
console.log('-------');

// read file async
console.log('async first');
var result = fs.readFile('sample.txt', 'utf-8', (err, result) => {
    console.log(result);
});

console.log('async final');