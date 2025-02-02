import * as React from 'react';
import { Link, useNavigate } from "react-router-dom";
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
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path d="M12 24H0V0H12L5.73913 12.2553L12 24Z" fill="#8AA96A"/>
        <path d="M12 24V0L24 24H12Z" fill="#C2D7AD"/>
      </svg>
    </SvgIcon>
  );
}

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

function ResponsiveAppBar() {
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
              Teacher Aid
            </Typography>
          </div>
          <div style={{ display: 'flex', alignItems: 'center'}}>
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
            <Button variant="contained" sx={{mr: 4}}>Login</Button>
            <Avatar {...stringAvatar('Neumann Davila')} 
            sx={{ cursor: "pointer" }}
            />
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;