const fs = require('fs');

// Specify the file path of reflection.txt
const filePath = 'reflection.txt';

// Read the contents of reflection.txt asynchronously
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }
  // Print the contents of the file to the terminal
  console.log(data);
});