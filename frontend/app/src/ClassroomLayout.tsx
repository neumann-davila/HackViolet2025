import { Button } from '@mui/material';
import { data } from '@remix-run/server-runtime';
import React, { useState, useEffect } from 'react';

export type Classroom = {
  name: string,
  rows: number,
  columns: number,
  desks: Boolean[][]
};

type ClassroomLayoutProps = {
  classroom: Classroom;
};


enum HelpRequired {
  NO_HELP,
  MINOR_HELP,
  MAJOR_HELP
}

type DeskGridData = {
    occupied: boolean,
    occupiedBy: string | null,
    needsHelp: HelpRequired 
  }


const ClassroomLayout: React.FC<ClassroomLayoutProps> = ({ classroom }) => {
  const { name, rows, columns, desks } = classroom;
  const [deskGrid, setDeskGrid] = useState<DeskGridData[][]>(() => {
    return Array.from({ length: rows }, () =>
      Array.from({ length: columns }, () => ({
      occupied: false,
      occupiedBy: null,
      needsHelp: HelpRequired.NO_HELP,
    })))
  });

  const [socket, setSocket] = useState<WebSocket | null>(null);
  
  // Student State Variables
  const [currentUser, setCurrentUser] = useState<number[]>([-1, -1])
  const [seatSelected, setSeatSelected] = useState(false);
  const [dataPending, setDataPending] = useState(false);

  useEffect(() => {
    if(rows && columns) {
      console.log(`Rows: ${rows}, Cols: ${columns}`)
      setDeskGrid(Array.from({ length: rows }, () =>
        Array.from({ length: columns }, () => ({
          occupied: false,
          occupiedBy: null,
          needsHelp: HelpRequired.NO_HELP,
        }))
      ))
    }

    if(socket == null) {
      const newSocket = new WebSocket('ws://localhost:5001');
      setSocket(newSocket);

      newSocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'DESK_STATE') {
          setDeskGrid(data.payload);
          console.log('Desk data received');
          console.log(data.payload);
        }
      };

      return () => {
        newSocket.close();
      };
    }
      

    if (socket && dataPending) {
      console.log(`Data Sent: ${deskGrid}`)
      socket.send(JSON.stringify({ type: 'DESK_STATE_UPDATE', payload: deskGrid }));
    }

    if(socket != null) {
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'DESK_STATE') {
          setDeskGrid(data.payload);
          console.log('Desk data received');
          console.log(data.payload);
        }
      };

      return () => {
        socket.close();
      };
    }
    }, [rows, columns, dataPending]);

    const deskInteract = (row: number, col: number) => {
      const user = localStorage.getItem('status');
      if(user === 'Teacher') {
        
      } else if (!seatSelected && !deskGrid[row][col].occupied) {
        setCurrentUser([row, col])
        setSeatSelected(true);

        setDeskGrid(prevDeskGrid => {
          const updatedGrid = prevDeskGrid.map((r, rowIndex) =>
            r.map((desk, colIndex) =>
              rowIndex === row && colIndex === col
                ? { ...desk, occupied: true, occupiedBy: "Student", needsHelp: HelpRequired.NO_HELP }
                : desk
            )
          );
          
          console.log("Updated DeskGrid:", updatedGrid);
          setDataPending(true);
          return updatedGrid; // Return the updated state
        });
        
        console.log(deskGrid[row][col]);
        
      }
    } 

  return (
    <div className="classroom-layout">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 50px)`,
          gap: "10px",
        }}
      >
        <div
        style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${columns}, 50px)`,
              gridGap: '5px',
              padding: '30px'
            }}
          >
            {desks.map((row, rowIndex) =>
              row.map((desk, colIndex) => (
                <button
                  key={`${rowIndex}-${colIndex}`}
                  style={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: desks[rowIndex][colIndex] ? 'green' : 'none',
                    border: '1px solid #000',
                  }}
                  onClick={() => deskInteract(rowIndex, colIndex)}
                  disabled={!desks[rowIndex][colIndex] as boolean}
                >{currentUser[0] == rowIndex && currentUser[1] == colIndex? 'You': 
                  !deskGrid?.[rowIndex]?.[colIndex]?.occupied? '' : 'Taken'}</button>
              ))
            )}
          </div>
        </div>  
        <div style={{
          display: 'flex',
          justifyContent: 'center'
        }}>
          <h2 style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'center'
          }}>
            Front of Classroom
          </h2>
        <div style={{
          display: 'flex',
          width: '30%'
        }}>
          <Button onClick={() => {
            setSeatSelected(false);
          }} disabled={!seatSelected}>Chage Seat</Button>
          </div>
        </div>
      </div>
  );
};

export default ClassroomLayout;