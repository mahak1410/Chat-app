const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

let rooms = {};

io.on('connection', (socket) => {
  console.log('A user connected');
  let currentUser = null;

  socket.on('join chat', (username) => {
    currentUser = username;
    socket.emit('room list', Object.keys(rooms));
  });

  socket.on('create room', (room) => {
    if (!rooms[room]) {
      rooms[room] = [];
      io.emit('room list', Object.keys(rooms));
    }
  });

  socket.on('join room', (room) => {
    socket.join(room);
    if (!rooms[room]) {
      rooms[room] = [];
    }
    rooms[room].push(currentUser);
    socket.emit('chat history', rooms[room]);
    io.to(room).emit('user joined', currentUser);
  });

  socket.on('leave room', (room) => {
    socket.leave(room);
    rooms[room] = rooms[room].filter(user => user !== currentUser);
    io.to(room).emit('user left', currentUser);
  });

  socket.on('chat message', ({ room, message }) => {
    const timestamp = new Date().toLocaleTimeString();
    const chatMessage = { user: currentUser, message, timestamp };
    rooms[room].push(chatMessage);
    io.to(room).emit('chat message', chatMessage);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const HOST = 'localhost';
const PORT = process.env.PORT || 3000;

server.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
