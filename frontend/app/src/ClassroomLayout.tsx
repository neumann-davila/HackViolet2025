import { Button } from '@mui/material';
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


const ClassroomLayout: React.FC<ClassroomLayoutProps> = ({ classroom }) => {
  const { name, rows, columns, desks } = classroom;
  const [deskGrid, setDeskGrid] = useState<{ occupied: boolean; occupiedBy: string | null; needsHelp: boolean }[][]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  
  // Student State Variables
  const [currentUser, setCurrentUser] = useState<number[]>([-1, -1])
  const [seatSelected, setSeatSelected] = useState(false);

  useEffect(() => {
      const socket = new WebSocket('ws://localhost:3000');
      setSocket(socket);

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'DESK_STATE') {
          //setDesks(data.payload);
        }
      };

      return () => {
        socket.close();
      };
    }, []);

    const deskInteract = (row: number, col: number) => {
      const user = localStorage.getItem('status');
      if(user === 'Teacher') {
        
      } else if (!seatSelected){
        setCurrentUser([row, col])
        setSeatSelected(true);
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
                >{currentUser[0] == rowIndex && currentUser[1] == colIndex? 'You': ''}</button>
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
        </div></div>
        
      </div>
  );
};

export default ClassroomLayout;