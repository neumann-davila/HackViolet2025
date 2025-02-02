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
      const socket = new WebSocket('ws://localhost:5001');
      setSocket(socket);
  
      socket.onmessage = (event) => {
        console.log(event)
        const data = JSON.parse(event.data);
        if (data.type === 'DESK_STATE') {
          if(data.payload.length !> 0) {
            setDeskGrid(data.payload)
            console.log('Desk data received:');
            console.log(data.payload)
          };
        }
      };

      return () => {
        socket.close();
      };
    }, []);

    const deskInteract = (row: number, col: number) => {
      const user = localStorage.getItem('status');
      if(user === 'Teacher') {
        
      } else if (!seatSelected && !deskGrid[row][col].occupied) {

        const newDesks = deskGrid.map((r, rowIndex) =>
          r.map((desk, colIndex) =>
            rowIndex === currentUser[0] && colIndex === currentUser[1]
              ? { ...desk, occupied: false, occupiedBy: null, needsHelp: HelpRequired.NO_HELP }
              : desk
          )
        );

        setCurrentUser([row, col])
        setSeatSelected(true);
        const desks = newDesks.map((r, rowIndex) =>
          r.map((desk, colIndex) =>
            rowIndex === row && colIndex === col
              ? { ...desk, occupied: true, occupiedBy: "Student", needsHelp: HelpRequired.NO_HELP }
              : desk
          )
        );
        setDeskGrid(desks);

        if (socket) {
          console.log(`Data Sent: `)
          console.log(JSON.stringify(deskGrid));
          socket.send(JSON.stringify({ type: 'DESK_STATE_UPDATE', payload: desks }));
          setDataPending(false)
        }
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