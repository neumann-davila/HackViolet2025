const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 3000 });

const users = {};

wss.on('connection', (ws) => {
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
