import * as React from 'react';
import type { MetaFunction } from '@remix-run/node';
import { Link as RemixLink, useLocation } from '@remix-run/react';
import { Typography, Box, Container, Tabs, Tab } from '@mui/material';
import darkTheme from '~/src/theme';

export const meta: MetaFunction = () => [
  { title: 'Remix with Material UI' },
  { name: 'Fun Little Template', content: 'Welcome to my site!' },
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
        display: { xs: 'none', sm: 'none', md: 'grid' },
        mt: 16,
      }}>
        <Typography variant="h2" component="h1" sx={{
          fontWeight: 500,
          pb: 3,
          mb: 4,
          borderBottom: `2px solid ${darkTheme.palette.divider}`,
        }}>
          Hello World!
        </Typography>
        <Typography variant='h4'>Fun Template Stuff</Typography>
      </Container>

      <Container disableGutters maxWidth='xl' sx={{
        display: { xs: 'none', sm: 'grid', md: 'none', lg: 'none', xl: 'none' },
        mt: 12,
      }}>
        <Typography variant="h3" component="h1" sx={{
          fontWeight: 500,
          pb: 2,
          mb: 3,
          borderBottom: `2px solid ${darkTheme.palette.divider}`,
        }}>
          Hello World!
        </Typography>
        <Typography variant='h4'>Fun Template Stuff</Typography>
      </Container>

      <Container disableGutters maxWidth='xl' sx={{
        display: { xs: 'grid', sm: 'none', md: 'none', lg: 'none', xl: 'none' },
        mt: 8,
      }}>
        <Typography variant="h4" component="h1" sx={{
          fontWeight: 500,
          pb: 1,
          mb: 2,
          borderBottom: `2px solid ${darkTheme.palette.divider}`,
        }}>
          Hello World!
        </Typography>
        <Typography variant='h4'>Fun Template Stuff</Typography>
      </Container>
    </React.Fragment>
  );
}
