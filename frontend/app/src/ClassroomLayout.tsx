import React, { useState, useEffect } from 'react';

export type Classroom = {
  name: string,
  rows: number,
  columns: number,
  desks: Boolean[][]
};

export type ClassroomLayoutProps = {
  classroom: Classroom;
};

const ClassroomLayout: React.FC<ClassroomLayoutProps> = ({ classroom }) => {
  const { name, rows, columns, desks } = classroom;
  const [socket, setSocket] = useState<WebSocket | null>(null);
  

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

    const deskInteract = () => {

    }

  return (
    <div className="classroom-layout">
      <h2>Layout</h2>
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
                  onClick={() => deskInteract()}
                />
              ))
            )}
          </div>
        </div>
      </div>
  );
};

export default ClassroomLayout;