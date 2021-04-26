const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const { Socket } = require('dgram');
const io = new Server(server);

app.use(express.static(__dirname + '/../build'))
app.use(cors());
app.use(express.json());

const port = 3000;
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        io.emit('chat message' , msg);
    });
});

