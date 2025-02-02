const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 5001 });

const users = {};
let deskState = []; // Store the desk grid state globally

wss.on('connection', (ws) => {
  // Send the current desk grid state to the new client upon connection
  ws.send(JSON.stringify({ type: 'DESK_STATE', payload: deskState }));

  ws.on('message', (message) => {
    const data = JSON.parse(message);

    if (data.type === 'SET_USERNAME') {
      users[data.payload.username] = { ws, userType: data.payload.userType };
      broadcastUserList();
    }

    if (data.type === 'PUBLIC_MESSAGE') {
      broadcast({ type: 'PUBLIC_MESSAGE', payload: data.payload });
    }

    if (data.type === 'PRIVATE_MESSAGE') {
      const recipientSocket = users[data.payload.recipient]?.ws;
      if (recipientSocket) {
        recipientSocket.send(JSON.stringify({ type: 'PRIVATE_MESSAGE', payload: data.payload }));
      }
    }

    // Handle desk state updates from clients
    if (data.type === 'DESK_STATE_UPDATE') {
      deskState = data.payload; // Update the server's desk state
      broadcastDeskState(); // Broadcast the new desk state to all clients
    }
  });

  ws.on('close', () => {
    for (const user in users) {
      if (users[user].ws === ws) {
        delete users[user];
        broadcastUserList();
        break;
      }
    }
  });
});

// Broadcast the updated desk state to all clients
function broadcastDeskState() {
  broadcast({ type: 'DESK_STATE', payload: deskState });
}

function broadcast(data) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

function broadcastUserList() {
  broadcast({ type: 'USER_LIST', payload: Object.keys(users) });
}