const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 3000 });

wss.on("connection", (ws) => {
  console.log("A user connected");

  ws.on("message", (message) => {
    const decodedMessage = message.toString();
    console.log("Received:", decodedMessage);

    // Send message to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(decodedMessage);
      }
    });
  });

  ws.on("close", () => {
    console.log("A user disconnected");
  });
});

console.log("WebSocket server running on ws://localhost:3000");


