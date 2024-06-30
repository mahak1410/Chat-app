# Real-Time Chat Application

This is a web-based real-time chat application that allows users to join chat rooms and exchange messages in real-time. The application is built using HTML, CSS, JavaScript, and Node.js with Socket.IO for real-time communication.

## Features

- User authentication with username
- Create and join chat rooms
- Real-time messaging
- Display usernames and timestamps for messages
- List of available chat rooms
- Responsive design for different screen sizes
- Notifications for new messages and user actions (join/leave)

## Requirements

- Node.js
- npm (Node Package Manager)


### Install dependencies

npm install


### Run the server

node server.js


By default, the application will run on `http://localhost:3000`. You can change the hostname and port in the `server.js` file if needed.

## Usage

1. Open your web browser and navigate to `http://localhost:3000`.
2. Enter your username and click "Join Chat".
3. Enter a room name and click "Create Room" to create a new room, or select an existing room from the list to join.
4. Start sending messages in real-time.

## Project Structure

- `server.js`: The main server file that sets up the Node.js server and Socket.IO.
- `public/index.html`: The HTML file for the chat application's user interface.
- `public/style.css`: The CSS file for styling the chat application's user interface.
- `public/script.js`: The JavaScript file for handling user interactions and real-time messaging.

## Technologies Used

- HTML
- CSS
- JavaScript
- Node.js
- Express.js
- Socket.IO
