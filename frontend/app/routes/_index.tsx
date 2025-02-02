import * as React from 'react';
import { Link, useNavigate } from "react-router-dom";
import type { MetaFunction } from '@remix-run/node';
import { Link as RemixLink, useLocation } from '@remix-run/react';
import { Typography, Box, Container, Tabs, Tab, TextField, Button, Stack, InputAdornment, IconButton} from '@mui/material';
import darkTheme from '~/src/theme';
import LoginIcon from '@mui/icons-material/Login';

export const meta: MetaFunction = () => [
  { title: 'Teacher Aid' },
  { name: 'A classroom tool to help bridge the gap between teacher and student', content: 'Welcome to Teacher Aid!' },
];

export default function Index() {
  const location = useLocation();

  // Find active tab index based on route
  const getTabIndex = () => {
    switch (location.pathname) {
      case '/about': return 1;
      case '/contact': return 2;
      default: return 0;
    }
  };

  return (
    <React.Fragment>
      {/* Navigation Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
        <Tabs value={getTabIndex()} centered>
          <Tab label="Home" component={RemixLink} to="/" />
          <Tab label="About" component={RemixLink} to="/student_view" />
          <Tab label="Contact" component={RemixLink} to="/teacher_view" />
        </Tabs>
      </Box>

      {/* Responsive Containers */}
      <Container disableGutters maxWidth='xl' sx={{
        display: { xs: 'none', sm: 'none', md: 'grid'},
        mt: 12,
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%'}}>
          <div style={{ display: 'flex', flexDirection: 'column', width: '50%'}}>
            <Typography variant="h2" component="h1" sx={{
              fontWeight: 500,
              pb: 3,
              mb: 4,
              borderBottom: `2px solid ${darkTheme.palette.divider}`,
              color: 'transparent',
              backgroundImage: `linear-gradient(.25turn, ${darkTheme.palette.primary.main}, ${darkTheme.palette.secondary.main})`,
              WebkitBackgroundClip: 'text',
            }}>
              Teacher Aid
            </Typography>
            <TextField id="code-entry" label="Enter Classroom Join Code" variant="outlined"
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end" sx={{ marginRight: 1 }}>
                    <IconButton edge="end" color="primary">
                      <LoginIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}/>
          </div>
        </div>
      </Container>

      <Container disableGutters maxWidth='xl' sx={{
        display: { xs: 'none', sm: 'grid', md: 'none', lg: 'none', xl: 'none' },
        mt: 12,
        alignItems: 'center',
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <Typography variant="h3" component="h1" sx={{
            fontWeight: 500,
            pb: 2,
            mb: 3,
            color: 'transparent',
            backgroundImage: `linear-gradient(.25turn, ${darkTheme.palette.primary.main}, ${darkTheme.palette.secondary.main})`,
            WebkitBackgroundClip: 'text',
            borderBottom: `2px solid ${darkTheme.palette.divider}`,
          }}>
            Teacher Aid
          </Typography>
        </div>
        <Stack spacing={2}>
          <div style={{ display: 'flex', alignItems: 'center'}}>
            <Typography 
            variant='h4' 
            sx={{
              mr: 4,
              display: 'flex',
              fontWeight: 500,
              color: 'inherit',
              textDecoration: 'none',
            }}>
              Enter Code:
            </Typography>
            <TextField id="code-entry" label="" variant="standard" />
          </div>
          <div style={{ display: 'flex', alignItems: 'center'}}>
            <Typography 
              variant='h4' 
              sx={{
                mr: 4,
                display: 'flex',
                fontWeight: 500,
                color: 'inherit',
                textDecoration: 'none',
              }}>
              Are you a teacher? Make an account now!
            </Typography>
            <Button variant="contained">Sign Up</Button>
          </div>
        </Stack>
      </Container>

      <Container disableGutters maxWidth='xl' sx={{
        display: { xs: 'grid', sm: 'none', md: 'none', lg: 'none', xl: 'none' },
        mt: 8,
        alignItems: 'center',
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <Typography variant="h4" component="h1" sx={{
            fontWeight: 500,
            pb: 1,
            mb: 2,
            color: 'transparent',
            backgroundImage: `linear-gradient(.25turn, ${darkTheme.palette.primary.main}, ${darkTheme.palette.secondary.main})`,
            WebkitBackgroundClip: 'text',
            borderBottom: `2px solid ${darkTheme.palette.divider}`,
          }}>
            Teacher Aid
          </Typography>
        </div>
        <Stack spacing={2}>
          <div style={{ display: 'flex', alignItems: 'center'}}>
            <Typography 
            variant='h4' 
            sx={{
              mr: 4,
              display: 'flex',
              fontWeight: 500,
              color: 'inherit',
              textDecoration: 'none',
            }}>
              Enter Code:
            </Typography>
            <TextField id="code-entry" label="" variant="standard" />
          </div>
          <div style={{ display: 'flex', alignItems: 'center'}}>
            <Typography 
              variant='h4' 
              sx={{
                mr: 4,
                display: 'flex',
                fontWeight: 500,
                color: 'inherit',
                textDecoration: 'none',
              }}>
              Are you a teacher? Make an account now!
            </Typography>
            <Button variant="contained">Sign Up</Button>
          </div>
        </Stack>
      </Container>
    </React.Fragment>
  );
}
