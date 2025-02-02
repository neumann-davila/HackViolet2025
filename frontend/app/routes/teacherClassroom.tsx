import React, { useState, useEffect } from 'react';
import { Box, Container, TextField, Button, Typography, List, ListItem, ListItemText, Select, MenuItem, Modal, Tooltip } from '@mui/material';
import ClassroomLayout, {Classroom} from '~/src/ClassroomLayout';

const TeacherClassroom: React.FC<{classroomName: string}> = (classroomName) => {
  const [classroom, setClassroom] = useState<Classroom>({
    name: '',
    rows: 0,
    columns: 0,
    desks: [[]]
  })

  const getClassroom = async () => {
    const res = await fetch('http://localhost:5000/classroomData', {
			method: "POST",
			headers: {
        'Content-Type': 'application/json',
				},
			body: JSON.stringify({
        name: "Default"
       })
		});    

    const answer = await res.json();

    setClassroom(answer as Classroom);
  }

  useEffect(() => {
    getClassroom();
  }, [])

  return (<div>
    <ClassroomLayout classroom={ classroom }/>
  </div>);
}

export default TeacherClassroom;