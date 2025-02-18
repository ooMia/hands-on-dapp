import fs from 'fs';
import http from 'node:http';
import path from 'path';

const PORT = 3000;

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        fs.readFile(path.join(process.cwd(), '/src/index.html'), (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
                server.emit('error', err);
            } else {
                server.emit('ok', req);
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    }
});

server.prependListener('error', (error) => {
    console.error(error);
    server.close();
});

server.on('ok', (req) => {
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.url;
    console.log(`\x1b[32m${timestamp} ${method} ${url} \x1b[0m`);
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
