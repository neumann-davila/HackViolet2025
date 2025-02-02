import React, { useState, useEffect, useRef } from 'react';
import { Box, Container, TextField, Button, Typography, List, ListItem, ListItemText, Select, MenuItem, Tooltip, Grid } from '@mui/material';

interface Message {
    username: string;
    message: string;
  }
  
const ChatApp: React.FC = () => {
    const [publicMessages, setPublicMessages] = useState<Message[]>([]);
    const [privateMessages, setPrivateMessages] = useState<{ [key: string]: Message[] }>({});
    const [newMessage, setNewMessage] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [userType, setUserType] = useState<'student' | 'teacher'>('student');
    const [recipient, setRecipient] = useState<string>('');
    const [userList, setUserList] = useState<string[]>([]);
    const ws = useRef<WebSocket | null>(null);
  
    useEffect(() => {
      ws.current = new WebSocket('ws://localhost:3000');
  
      ws.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
  
          if (data.type === 'PUBLIC_MESSAGE') {
            setPublicMessages((prev) => [...prev, data.payload]);
          }
  
          if (data.type === 'PRIVATE_MESSAGE') {
            if (data.payload.recipient === username) {
              setPrivateMessages((prev) => ({
                ...prev,
                [data.payload.sender]: [...(prev[data.payload.sender] || []), data.payload],
              }));
            }
          }
  
          if (data.type === 'USER_LIST') {
            setUserList(data.payload);
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
    }, [username]);
  
    const handleSetUsername = () => {
      if (username.trim() !== '' && ws.current) {
        ws.current.send(JSON.stringify({ type: 'SET_USERNAME', payload: { username, userType } }));
      }
    };
  
    const handleSendMessage = () => {
      if (newMessage.trim() !== '' && ws.current) {
        const payload =
          userType === 'student' || !recipient
            ? { type: 'PUBLIC_MESSAGE', payload: { username, message: newMessage, senderType: userType } }
            : { type: 'PRIVATE_MESSAGE', payload: { sender: username, recipient, message: newMessage } };
  
        ws.current.send(JSON.stringify(payload));
  
        if (userType === 'teacher' && recipient) {
          setPrivateMessages((prev) => ({
            ...prev,
            [recipient]: [...(prev[recipient] || []), { username: 'You', message: newMessage }],
          }));
        } else {
          setPublicMessages((prev) => [...prev, { username: 'You', message: newMessage }]);
        }
  
        setNewMessage('');
      }
    };
  
    return (
      <Container disableGutters maxWidth="xl" sx={{ display: 'flex', mt: 16, justifyContent: 'space-between' }}>
        <Box sx={{ flex: 1, mr: 4 }}>
          <DeskGrid userType={userType} username={username} />
        </Box>
  
        <Box sx={{ flex: 1 }}>
          <Typography variant="h2" sx={{ fontWeight: 500, mb: 4 }}>Chat Room</Typography>
  
          <Select
            fullWidth
            value={userType}
            onChange={(e) => setUserType(e.target.value as 'student' | 'teacher')}
            sx={{ mb: 2 }}
          >
            <MenuItem value="student">Student</MenuItem>
            <MenuItem value="teacher">Teacher</MenuItem>
          </Select>
  
          <TextField
            fullWidth
            label="Enter your username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" onClick={handleSetUsername} sx={{ mb: 3 }}>
            Set Username
          </Button>
  
          {userType === 'teacher' && (
            <Select
              fullWidth
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              displayEmpty
              sx={{ mb: 2 }}
            >
              <MenuItem value="">Public Chat</MenuItem>
              {userList.map((user) => (
                <MenuItem key={user} value={user}>
                  {user}
                </MenuItem>
              ))}
            </Select>
          )}
  
  {userType === 'teacher' && (
    <>
      <Typography variant="h5" sx={{ fontWeight: 500, mt: 3 }}>Public Chat</Typography>
      <Box sx={{ maxHeight: '200px', overflowY: 'auto', mb: 3, border: '1px solid gray', padding: 2 }}>
        <List>
          {publicMessages.map((msg, index) => (
            <ListItem key={index}>
              <ListItemText primary={`${msg.username}:`} secondary={msg.message} />
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  )}
  
          {userType === 'teacher' && recipient && (
            <>
              <Typography variant="h5" sx={{ fontWeight: 500 }}>Private Chat with {recipient}</Typography>
              <Box sx={{ maxHeight: '200px', overflowY: 'auto', mb: 3, border: '1px solid gray', padding: 2 }}>
                <List>
                  {(privateMessages[recipient] || []).map((msg, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={`${msg.username}: ${msg.message}`} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </>
          )}
  
          <TextField
            fullWidth
            label="Type your message..."
            variant="outlined"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" onClick={handleSendMessage} sx={{ mb: 3 }}>
            Send
          </Button>
        </Box>
      </Container>
    );
  };
  
  export default ChatApp;