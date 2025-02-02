import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ClassroomLayout, { Classroom } from "~/src/ClassroomLayout";

const StudentClassroom = () => {
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
    console.log('Room Name: ' + roomName);
    getClassroom();
  }, [])

  
  return (<div
    style={{
      display: 'flex',
      width: '100%',
      justifyContent: 'center'
    }}>
      <ClassroomLayout key={`${classroom.rows}-${classroom.columns}`} classroom={ classroom } />
    </div>);
}

export default StudentClassroom;