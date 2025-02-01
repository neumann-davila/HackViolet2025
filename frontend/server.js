const WebSocket = require('ws');  // Import the ws library

// Create a WebSocket server that listens on port 3000
const wss = new WebSocket.Server({ port: 3000 });

wss.on('connection', (ws) => {
  console.log('A user connected');

  // When the server receives a message from the client
  ws.on('message', (message) => {
    const decodedMessage = message.toString();  // Convert buffer to string
    console.log('Received message from client:', decodedMessage);  // Log readable message
  });

  // When the WebSocket connection is closed
  ws.on('close', () => {
    console.log('A user disconnected');
  });

  // Send a welcome message to the client when they connect
  ws.send('Welcome to the WebSocket server!');
});

console.log('WebSocket server is running on ws://localhost:3000');

