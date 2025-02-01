import React, { useState, useEffect } from 'react';
import { Box, Container, TextField, Button, Typography, List, ListItem, ListItemText, Select, MenuItem } from '@mui/material';

const DeskGrid: React.FC<{ userType: 'student' | 'teacher' }> = ({ userType }) => {
  const [rows, setRows] = useState<number>(0);
  const [cols, setCols] = useState<number>(0);
  const [desks, setDesks] = useState<boolean[][]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3000');
    setSocket(socket);

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'DESK_STATE') {
        setDesks(data.payload);
      }
    };

    return () => {
      socket.close();
    };
  }, []);

  const toggleDesk = (row: number, col: number) => {
    // Allow desk toggling for both students and teachers
    const newDesks = desks.map((r, rowIndex) =>
      r.map((desk, colIndex) =>
        rowIndex === row && colIndex === col ? !desk : desk
      )
    );
    setDesks(newDesks);

    if (socket) {
      socket.send(JSON.stringify({ type: 'DESK_STATE_UPDATE', payload: newDesks }));
    }
  };

  const generateGrid = () => {
    setDesks(Array(rows).fill(Array(cols).fill(false)));
  };

  const modifyGridSize = (operation: 'add' | 'remove', type: 'row' | 'col') => {
    if (userType === 'student') return; // Prevent grid modification for students

    if (type === 'row') {
      setRows((prev) => (operation === 'add' ? prev + 1 : Math.max(0, prev - 1)));
    } else {
      setCols((prev) => (operation === 'add' ? prev + 1 : Math.max(0, prev - 1)));
    }
  };

  return (
    <div>
      {userType === 'teacher' && (
        <>
          <div>
            <label>
              Rows:
              <input
                type="number"
                value={rows}
                onChange={(e) => setRows(parseInt(e.target.value))}
              />
            </label>
            <label>
              Columns:
              <input
                type="number"
                value={cols}
                onChange={(e) => setCols(parseInt(e.target.value))}
              />
            </label>
            <button onClick={generateGrid}>Generate Grid</button>
          </div>

          <div>
            <button onClick={() => modifyGridSize('add', 'row')}>Add Row</button>
            <button onClick={() => modifyGridSize('add', 'col')}>Add Column</button>
            <button onClick={() => modifyGridSize('remove', 'row')}>Remove Row</button>
            <button onClick={() => modifyGridSize('remove', 'col')}>Remove Column</button>
          </div>
        </>
      )}
      
      {/* Display the grid for both teachers and students */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, 50px)`,
          gridGap: '5px',
          marginBottom: '20px',
        }}
      >
        {desks.map((row, rowIndex) =>
          row.map((desk, colIndex) => (
            <button
              key={`${rowIndex}-${colIndex}`}
              style={{
                width: '50px',
                height: '50px',
                backgroundColor: desk ? 'green' : 'red',
                border: '1px solid #000',
              }}
              onClick={() => toggleDesk(rowIndex, colIndex)}
              disabled={userType === 'student' && !desk} // Disable toggle for student when desk is unoccupied
            >
              Desk
            </button>
          ))
        )}
      </div>

      {userType === 'student' && (
        <Typography variant="h5" sx={{ fontWeight: 500 }}>You cannot modify the desk grid as a student.</Typography>
      )}
    </div>
  );
};

export default function ChatApp() {
  const [publicMessages, setPublicMessages] = React.useState<{ username: string; message: string }[]>([]);
  const [privateMessages, setPrivateMessages] = React.useState<{ [key: string]: { username: string; message: string }[] }>({});
  const [newMessage, setNewMessage] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [userType, setUserType] = React.useState<'student' | 'teacher'>('student');
  const [recipient, setRecipient] = React.useState('');
  const [userList, setUserList] = React.useState<string[]>([]);
  const ws = React.useRef<WebSocket | null>(null);

  React.useEffect(() => {
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
        <DeskGrid userType={userType} />
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

        {userType === 'teacher' && recipient && (
          <>
            <Typography variant="h5" sx={{ fontWeight: 500 }}>Private Chat with {recipient}</Typography>
            <Box sx={{ maxHeight: '200px', overflowY: 'auto', mb: 3, border: '1px solid gray', padding: 2 }}>
              <List>
                {(privateMessages[recipient] || []).map((msg, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={`${msg.username}:`} secondary={msg.message} />
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
}






