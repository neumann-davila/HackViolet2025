import { Button, FormControlLabel, FormGroup, Switch } from '@mui/material';
import React, { useState, useEffect } from 'react';

const DeskGrid: React.FC = () => {
  const [rows, setRows] = useState<number>(1);
  const [cols, setCols] = useState<number>(1);
  const [desks, setDesks] = useState<boolean[][]>([]);
  const [toggleRow, setToggleRow] = useState(false);
  const [toggleCol, setToggleCol] = useState(false);
  const [roomGenerated, setGenerated] = useState(false);

  const toggleDesk = (row: number, col: number) => {
    const newDesks = [...desks];
    if(toggleCol) {
      if(toggleRow){
        for(let i = 0; i < rows; i++) {
          newDesks[i][col] = !newDesks[i][col];
        }
        for(let i = 0; i < cols; i++) {
          newDesks[row][i] = !newDesks[row][i];
        }
        newDesks[row][col] = !newDesks[row][col];
      } else {
        for(let i = 0; i < rows; i++) {
          newDesks[i][col] = !newDesks[i][col];
        }
      }
    } else if (toggleRow) {
      for(let i = 0; i < cols; i++) {
        newDesks[row][i] = !newDesks[row][i];
      }
    } else {
      newDesks[row][col] = !newDesks[row][col];
    }
    setDesks(newDesks);
  };
 
  const confirm = async () => {
    const res = await fetch('http://localhost:5000/newClassroom', {
			method: "PUT",
			headers: {
        'Content-Type': 'application/json',
				},
			body: JSON.stringify({ 
        name: "Default",
        layout: desks
      })
		});


  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center'
        }}>
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
        <Button variant='outlined' onClick={() => {
          setDesks(Array.from({ length: rows }, () => Array(cols).fill(true)));
          setGenerated(true);
          }}>Generate Classroom</Button>
        <FormGroup>
          <FormControlLabel control={<Switch />} label='Toggle Column' onChange={() => {
            if(toggleCol){
              setToggleCol(false);
            } else {
              setToggleCol(true);
            }
          }}/>
          <FormControlLabel control={<Switch/>} label='Toggle Row' onChange={() => {
            if(toggleRow){
              setToggleRow(false);
            } else {
              setToggleRow(true);
            }
          }}/>
        </FormGroup>
      </div>
      <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        paddingTop: 30
      }}>
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
                    backgroundColor: desk ? 'green' : 'black',
                    border: '1px solid #000',
                  }}
                  onClick={() => toggleDesk(rowIndex, colIndex)}
                />
              ))
            )}
          </div>
        </div>
        <div
        style={{
          display: 'flex',
          justifyContent: 'right',
        }}>
          <Button variant='contained' disabled={!roomGenerated} onClick={confirm}>Confirm</Button>
        </div>
      </div>
  );
};

export default DeskGrid;
