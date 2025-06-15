const fs = require('fs');

fs.readFile('sample.txt', 'utf8', (err, data) => {
    if (err) {
        console.log('Error reading sample.txt:', err);
    } else {
        console.log('Content of sample.txt:', data);
    }
});

fs.writeFile('newfile.txt', 'This is a new file created by Node.js!', (err) => {
    if (err) {
        console.log('Error creating newfile.txt:', err);
    } else {
        console.log('newfile.txt has been created successfully!');
    }
});

fs.appendFile('sample.txt', '\nAppended content.', (err) => {
    if (err) {
        console.log('Error appending to sample.txt:', err);
    } else {
        console.log('Content has been appended to sample.txt');
    }
});

fs.unlink('newfile.txt', (err) => {
    if (err) {
        console.log('Error deleting newfile.txt:', err);
    } else {
        console.log('newfile.txt has been deleted successfully!');
    }
});