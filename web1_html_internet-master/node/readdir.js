const fs = require('fs');
const testFolder = '../data/';

fs.readdir(testFolder, (err, files) => { 
    console.log("\nCurrent directory files:"); 
    if (err) 
      console.log(err); 
    else { 
      files.forEach(file => { 
        console.log(file); 
      }) 
    } 
  }) 