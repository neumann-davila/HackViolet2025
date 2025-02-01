import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Menu, MenuItem, Button, SvgIcon } from '@mui/material';
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

const menuItems = [
  {name: 'Blog', link: '/blog'},
  {name: 'Projects', link: '/projects'}
];

function DropDownMenu() {
  const navigate = useNavigate();
  const buttonRef = React.useRef<HTMLButtonElement | null>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [buttonWidth, setButtonWidth] = React.useState<number>(0);

  React.useEffect(() => {
    if (buttonRef.current) {
      setButtonWidth(buttonRef.current.offsetWidth); // Get the button's width
    }
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (link: string, name: string) => {
    navigate(link);
    handleClose();
  };

  return (
    <div>
      <Button
        ref={buttonRef}
        sx={{
          borderRadius: '8px', // Rounded corners
          paddingTop: .1,
          paddingBottom: .1,
          paddingLeft: 1.5,
          paddingRight: 1.5,
          border: `1px solid ${darkTheme.palette.divider}`,
          color: '#fef9ec', // Text color
          fontWeight: 'bold',
          textTransform: 'none',
        }}
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        <Typography variant="h6">
          Menu
        </Typography>
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              width: buttonWidth,
              backgroundColor: darkTheme.palette.background.paper
            }
          }
        }}
      >
        {menuItems.map((item) => (
          <MenuItem
            key={item.name}
            onClick={() => handleMenuItemClick(item.link, item.name)}
          >
            {item.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
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
              Remix with Material UI
            </Typography>
          </div>
          <DropDownMenu></DropDownMenu>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;