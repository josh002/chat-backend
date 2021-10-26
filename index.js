const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io")
const io = new Server(server, (http, {
    cors: {
        origin: true,
        credentials: true,
        methods: ["GET", "POST"]
    }
}));

const cors = require('cors');
app.use(cors())

app.get('/', (req, res) => {
    res.send({ data: 'ok' })
});

io.on('connection', (socket) => {
    socket.on('sendMessage', (messageInfo) => {
        socket.broadcast.emit("receiveMessage", messageInfo)
    })
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});