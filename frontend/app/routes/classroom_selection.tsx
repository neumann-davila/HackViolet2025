import React, { useState, useEffect } from 'react';

const DeskGrid: React.FC = () => {
  const [rows, setRows] = useState<number>(0);
  const [cols, setCols] = useState<number>(0);
  const [desks, setDesks] = useState<boolean[][]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    // Initialize WebSocket connection
    const socket = new WebSocket('ws://localhost:3000');
    setSocket(socket);

    // Listen for messages from the server
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'DESK_STATE') {
        setDesks(data.payload); // Update grid with server's desk state
      }
    };

    return () => {
      socket.close();
    };
  }, []);

  const toggleDesk = (row: number, col: number) => {
    const newDesks = [...desks];
    newDesks[row][col] = !newDesks[row][col];
    setDesks(newDesks);

    // Send updated grid state to the server via WebSocket
    if (socket) {
      socket.send(JSON.stringify({ type: 'DESK_STATE_UPDATE', payload: newDesks }));
    }
  };

  return (
    <div>
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
        <button onClick={() => setDesks(Array(rows).fill(Array(cols).fill(false)))}>Generate Grid</button>
      </div>

      <div>
        <button onClick={() => setRows(rows + 1)}>Add Row</button>
        <button onClick={() => setCols(cols + 1)}>Add Column</button>
        <button onClick={() => setRows(rows - 1)}>Remove Row</button>
        <button onClick={() => setCols(cols - 1)}>Remove Column</button>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, 50px)`,
          gridGap: '5px',
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
            >
              Desk
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default DeskGrid;
