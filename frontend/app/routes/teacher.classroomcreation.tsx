import { Box, Button, TextField, FormGroup, FormControlLabel, Switch, Container, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Link as RemixLink} from '@remix-run/react';
import darkTheme from '~/src/theme';
import { useNavigate } from '@remix-run/react'; 


const DeskGrid: React.FC = () => {
  const [rows, setRows] = useState<number>(1);
  const [cols, setCols] = useState<number>(1);
  const [desks, setDesks] = useState<boolean[][]>([]);
  const [toggleRow, setToggleRow] = useState(false);
  const [toggleCol, setToggleCol] = useState(false);
  const [roomGenerated, setGenerated] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [classroomName, setClassroomName] = useState(""); 
  const navigate = useNavigate();

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
    if (!classroomName) {
      alert("Please enter a classroom name."); // Validate classroom name
      return;
    }
    const res = await fetch('http://localhost:5000/newClassroom', {
			method: "PUT",
			headers: {
        'Content-Type': 'application/json',
				},
			body: JSON.stringify({ 
        name: classroomName,
        rows: rows,
        columns: cols,
        desks: desks
      })
		});
    if (res.ok) {
      alert("Classroom created successfully!");
      setOpenDialog(false); // Close the dialog
      console.log(`Navigating to /teacher/classroom/${classroomName}`);
      navigate(`/teacher/classroom/${classroomName}`);
    } else {
      alert("Failed to create classroom.");
    }

  };

  return (
    <React.Fragment>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Container maxWidth="md">
          <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
            <Box display="flex" justifyContent="space-between" width="100%" gap={2} alignItems="center">
              <Box display="flex" gap={2}>
                <TextField
                  label="Rows"
                  type="number"
                  value={rows}
                  onChange={(e) => setRows(parseInt(e.target.value))}
                  size="small"
                />
                <TextField
                  label="Columns"
                  type="number"
                  value={cols}
                  onChange={(e) => setCols(parseInt(e.target.value))}
                  size="small"
                />
              </Box>
              <Button
                variant='outlined'
                onClick={() => {
                  setDesks(Array.from({ length: rows }, () => Array(cols).fill(true)));
                  setGenerated(true);
                }}
              >
                Generate Classroom
              </Button>
            </Box>
            <Box display="flex" justifyContent="space-between" width="100%">
              <FormGroup row>
                <FormControlLabel control={<Switch checked={toggleCol} onChange={() => setToggleCol(!toggleCol)} />} label='Toggle Column' />
                <FormControlLabel control={<Switch checked={toggleRow} onChange={() => setToggleRow(!toggleRow)} />} label='Toggle Row' />
              </FormGroup>
                <Button variant='contained' disabled={!roomGenerated} onClick={() => setOpenDialog(true)}>Confirm</Button>
            </Box>
          </Box>
        </Container>
        <Box display="flex" justifyContent="center" pt={3}>
          <Box
            display="grid"
            sx={{ gridTemplateColumns: `repeat(${cols}, 50px)`, gap: 1 }}
          >
            {desks.map((row, rowIndex) =>
              row.map((desk, colIndex) => (
                <Button
                  key={`${rowIndex}-${colIndex}`}
                  sx={{
                    width: 50,
                    height: 50,
                    backgroundColor: desk ? darkTheme.palette.primary.main : darkTheme.palette.background.paper,
                    border: '1px solid #000',
                    minWidth: 0,
                  }}
                  onClick={() => toggleDesk(rowIndex, colIndex)}
                />
              ))
            )}
          </Box>
        </Box>
        <Box display="flex" justifyContent="flex-end" mt={2}>
        
        </Box>
      </Container>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Enter Classroom Name</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Classroom Name"
            type="text"
            fullWidth
            value={classroomName}
            onChange={(e) => setClassroomName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <RemixLink to={`/teacher/classroom/${classroomName}`} style={{ textDecoration: "none" }}>
          <Button onClick={confirm}>Confirm</Button>
          </RemixLink>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default DeskGrid;
