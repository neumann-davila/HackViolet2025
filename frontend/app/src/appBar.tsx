import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link as RemixLink} from '@remix-run/react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Menu, MenuItem, Button, SvgIcon, TextField, Avatar } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import darkTheme from './theme';

function WebsiteIcon() {
  return(
    <SvgIcon>
      <svg
        width="64" height="64"
        viewBox="0 0 64 64"
        fill="none"
      >
        <path d="M19.7285 62V7.4082H0.369141V1.95312H45.5273V7.4082H26.9062V62H19.7285Z" fill="#8AA96A"/>
        <path d="M7.13281 62L25.5703 4.8125H35.5703L54.2031 62H47.0938L42.0547 46.7266H18.7734L13.9688 62H7.13281ZM20.3359 41.6484H40.4531L30.4531 9.30469L20.3359 41.6484Z" fill="#C2D7AD"/>
      </svg>
    </SvgIcon>
  );
}

function ResponsiveAppBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const status = localStorage.getItem("status");
    const name = localStorage.getItem("userName");

    if (status === "Teacher" && name)
    {
      setIsLoggedIn(true);
      setUserName(name);
    }
  }, []);
  
  
  return (
    <AppBar position="static" color="transparent" sx={{
      borderBottom: `1px solid ${darkTheme.palette.divider}`,
      boxShadow: 'none',
    }}>
      <Container maxWidth='xl'>
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between', width: '100%'}}>
          <div style={{  display: 'flex', alignItems: 'center'}}>
            <WebsiteIcon></WebsiteIcon>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                ml: 2,
                mr: 2,
                display: 'flex',
                fontWeight: 500,
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              TeacherAid
            </Typography>
          </div>
          {isLoggedIn ?  (
          <div style={{ display: 'flex', alignItems: 'center'}}>
            <Avatar sx={{bgcolor: 'primary.main', mr: 2}}>
              {userName.charAt(0).toUpperCase()}
            </Avatar>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 500,
                color: 'inherit',
              }}
              >
                {userName}
              </Typography>
              </div>
          ) : (
            <div style={{display: 'flex', alignItems: 'center'}}>
          <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: 'flex',
                fontWeight: 500,
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Are you a teacher?
            </Typography>
            <RemixLink to="/login" style={{ textDecoration: "none" }}>
              <Button variant="contained">Login</Button>
            </RemixLink>
          </div>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;