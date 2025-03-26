const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const EventEmitter = require('events');

const PORT = 3000;
const eventEmitter = new EventEmitter();

eventEmitter.on('fileAction', (message) => {
    console.log(`Event: ${message}`);
});

const requestHandler = (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const query = parsedUrl.query;
    const fileName = query.filename;
    const filePath = path.join(__dirname, fileName || 'default.txt');

    switch (parsedUrl.pathname) {
        case '/create':
            fs.writeFile(filePath, 'Hello, this is a new file!', (err) => {
                if (err) {
                    res.writeHead(500);
                    res.end('Error creating file');
                } else {
                    eventEmitter.emit('fileAction', `File created: ${fileName}`);
                    res.writeHead(200);
                    res.end(`File created: ${fileName}`);
                }
            });
            break;

        case '/read':
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    res.writeHead(404);
                    res.end('File not found');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                    res.end(data);
                }
            });
            break;

        case '/update':
            fs.appendFile(filePath, '\nAppended content.', (err) => {
                if (err) {
                    res.writeHead(500);
                    res.end('Error updating file');
                } else {
                    eventEmitter.emit('fileAction', `File updated: ${fileName}`);
                    res.writeHead(200);
                    res.end(`File updated: ${fileName}`);
                }
            });
            break;

        case '/delete':
            fs.unlink(filePath, (err) => {
                if (err) {
                    res.writeHead(404);
                    res.end('File not found');
                } else {
                    eventEmitter.emit('fileAction', `File deleted: ${fileName}`);
                    res.writeHead(200);
                    res.end(`File deleted: ${fileName}`);
                }
            });
            break;

        default:
            res.writeHead(404);
            res.end('Invalid route');
    }
};

const server = http.createServer(requestHandler);
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
