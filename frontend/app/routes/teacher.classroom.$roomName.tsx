import React, { useState, useEffect } from 'react';
import { Box, Container, TextField, Button, Typography, List, ListItem, ListItemText, Select, MenuItem, Modal, Tooltip } from '@mui/material';
import TeacherFeed from '~/src/teacherFeed';
import ClassroomLayout, {Classroom} from '~/src/ClassroomLayout';
import { useParams } from 'react-router-dom';

const TeacherClassroom = () => {
  const [classroom, setClassroom] = useState<Classroom>({
    name: '',
    rows: 0,
    columns: 0,
    desks: [[]]
  });
  const { roomName } = useParams(); 

  const getClassroom = async () => {
    const res = await fetch('http://localhost:5000/classroomData', {
			method: "POST",
			headers: {
        'Content-Type': 'application/json',
				},
			body: JSON.stringify({
        name: roomName
       })
		});    

    const answer = await res.json();

    setClassroom(answer as Classroom);
  }

  useEffect(() => {
    console.log(roomName);
    getClassroom();
  }, [])

  return (<div
  style={{
    display: 'flex',
    width: '100%',
    justifyContent: 'center'
  }}>
    <ClassroomLayout classroom={ classroom }/>
    <TeacherFeed />
  </div>);
}

export default TeacherClassroom;