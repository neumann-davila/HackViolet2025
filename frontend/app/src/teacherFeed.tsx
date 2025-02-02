import { TextField } from "@mui/material";
import { useState, useEffect} from "react";



const TeacherFeed = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
        const socket = new WebSocket('ws://localhost:3000');
        setSocket(socket);
  
        socket.onmessage = (event) => {
          const data = JSON.parse(event.data);
          if (data.type === 'DESK_STATE') {
          }
        };
  
        return () => {
          socket.close();
        };
      }, []);
  
  return(<div>
    <div style={{
      height: '100%'
    }}>

    </div>
    <TextField id="outlined-basic" label="Message Class" variant="outlined"/>
  </div>)
};

export default TeacherFeed;