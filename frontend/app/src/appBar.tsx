import * as React from 'react';
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
            <RemixLink to="/login" style={{ textDecoration: "none" }}>
              <Button variant="contained">Login</Button>
            </RemixLink>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;