import * as React from 'react';
import { Box, Container, TextField, Button, Typography, List, ListItem, ListItemText } from '@mui/material';
import { MetaFunction } from '@remix-run/node';
import darkTheme from '~/src/theme';

export const meta: MetaFunction = () => [
  { title: 'WebSocket Chat App' },
  { name: 'Fun Chat Template', content: 'Welcome to the chat!' },
];

interface ChatMessage {
  username: string;
  message: string;
}

export default function ChatApp() {
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = React.useState('');
  const [username, setUsername] = React.useState('User');
  const ws = React.useRef<WebSocket | null>(null);

  React.useEffect(() => {
    ws.current = new WebSocket('ws://localhost:3000'); // Connect to WebSocket server

    ws.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'NEW_MESSAGE') {
          setMessages((prevMessages) => [...prevMessages, data.payload]);
        }
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      ws.current?.close();
    };
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim() !== '' && ws.current) {
      const messagePayload = {
        type: 'NEW_MESSAGE',
        payload: {
          username,
          message: newMessage,
        },
      };

      ws.current.send(JSON.stringify(messagePayload)); // Send message to server
      setNewMessage(''); // Clear input field
    }
  };

  return (
    <Container disableGutters maxWidth="xl" sx={{ display: 'grid', mt: 16, textAlign: 'center' }}>
      <Typography variant="h2" component="h1" sx={{ fontWeight: 500, mb: 4, borderBottom: `2px solid ${darkTheme.palette.divider}` }}>
        Chat Room
      </Typography>

      {/* Chat Messages Display */}
      <Box sx={{ maxHeight: '400px', overflowY: 'auto', mb: 3 }}>
        <List>
          {messages.map((msg, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`${msg.username}:`}
                secondary={msg.message}
              />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Message Input Area */}
      <TextField
        fullWidth
        label="Type your message..."
        variant="outlined"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Button variant="contained" color="primary" onClick={handleSendMessage} sx={{ mb: 3 }}>
        Send
      </Button>

      {/* Username Input */}
      <TextField
        fullWidth
        label="Enter your username"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        sx={{ mb: 2 }}
      />
    </Container>
  );
}
