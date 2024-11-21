const next = require('next');
const { createServer } = require('http');
const { parse } = require('url');
const SocketIO = require('socket.io');

const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = createServer((req, res) => {
        const parsedUrl = parse(req.url, true);
        handle(req, res, parsedUrl);
    });

    const io = new SocketIO.Server(server);

    io.on('connection', (socket) => {
        console.log('New client connected');

        socket.on('message', (msg) => {
            socket.broadcast.emit('message', msg);
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });

    server.listen(3000, (err) => {
        if (err) throw err;
        console.log('> Ready on http://localhost:3000');
    });
});
