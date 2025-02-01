import * as React from 'react';
import type { MetaFunction } from '@remix-run/node';
import { Link as RemixLink } from '@remix-run/react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import darkTheme from '~/src/theme';
import { Box, Container } from '@mui/material';
import profileImage from '../files/profile_photo.jpg'

// https://remix.run/docs/en/main/route/meta
export const meta: MetaFunction = () => [
  { title: 'Remix with Material UI' },
  { name: 'Fun Little Template', content: 'Welcome to my site!' },
];

// https://remix.run/docs/en/main/file-conventions/routes#basic-routes
export default function Index() {
  return (
    <React.Fragment>
      <Container disableGutters maxWidth='xl' sx={{
        display: { xs: 'none', sm: 'none' ,md: 'grid'},
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
        <Typography variant='h4'>
          Fun Template Stuff
        </Typography>
      </Container>



      <Container disableGutters maxWidth='xl' sx={{
        display: { xs: 'none', sm: 'grid' ,md: 'none', lg: 'none', xl: 'none' },
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
        <Typography variant='h4'>
          Fun Template Stuff
        </Typography>
      </Container>



      <Container disableGutters maxWidth='xl' sx={{
        display: { xs: 'grid', sm: 'none' ,md: 'none', lg: 'none', xl: 'none' },
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
        <Typography variant='h4'>
          Fun Template Stuff
        </Typography>
      </Container>
    </React.Fragment>
  );
}
