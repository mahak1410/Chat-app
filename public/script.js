const socket = io();

const authContainer = document.getElementById('auth-container');
const roomContainer = document.getElementById('room-container');
const chatContainer = document.getElementById('chat-container');
const joinChatButton = document.getElementById('join-chat-button');
const createRoomButton = document.getElementById('create-room-button');
const roomInput = document.getElementById('room-input');
const roomList = document.getElementById('room-list');
const form = document.getElementById('chat-form');
const input = document.getElementById('message-input');
const messages = document.getElementById('messages');
const currentRoomSpan = document.getElementById('current-room');
const leaveRoomButton = document.getElementById('leave-room-button');
const usernameInput = document.getElementById('username-input');

let currentRoom = '';
let currentUser = '';

joinChatButton.addEventListener('click', () => {
  const username = usernameInput.value.trim();
  if (username) {
    currentUser = username;
    socket.emit('join chat', username);
    authContainer.style.display = 'none';
    roomContainer.style.display = 'block';
  }
});

createRoomButton.addEventListener('click', () => {
  const room = roomInput.value.trim();
  if (room) {
    socket.emit('create room', room);
    roomInput.value = '';
  }
});

roomList.addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    const room = e.target.textContent;
    joinRoom(room);
  }
});

leaveRoomButton.addEventListener('click', () => {
  leaveRoom(currentRoom);
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value && currentRoom) {
    socket.emit('chat message', { room: currentRoom, message: input.value });
    input.value = '';
  }
});

socket.on('room list', (rooms) => {
  roomList.innerHTML = '';
  rooms.forEach(room => {
    const li = document.createElement('li');
    li.textContent = room;
    roomList.appendChild(li);
  });
});

socket.on('chat history', (chatHistory) => {
  messages.innerHTML = '';
  chatHistory.forEach(msg => addMessage(msg));
});

socket.on('chat message', (msg) => {
  addMessage(msg);
});

socket.on('user joined', (user) => {
  const item = document.createElement('li');
  item.textContent = `${user} joined the room`;
  item.style.fontStyle = 'italic';
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});

socket.on('user left', (user) => {
  const item = document.createElement('li');
  item.textContent = `${user} left the room`;
  item.style.fontStyle = 'italic';
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});

function joinRoom(room) {
  if (currentRoom) {
    socket.emit('leave room', currentRoom);
  }
  currentRoom = room;
  socket.emit('join room', room);
  roomContainer.style.display = 'none';
  chatContainer.style.display = 'block';
  currentRoomSpan.textContent = `Room: ${room}`;
}

function leaveRoom(room) {
  socket.emit('leave room', room);
  chatContainer.style.display = 'none';
  roomContainer.style.display = 'block';
  currentRoom = '';
}

function addMessage(msg) {
  const item = document.createElement('li');
  item.textContent = `${msg.timestamp} - ${msg.user}: ${msg.message}`;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
}
