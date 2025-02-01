import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import ResponsiveAppBar from './appBar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Container maxWidth={false} disableGutters>
      <ResponsiveAppBar></ResponsiveAppBar>
      <Container maxWidth='xl' sx={{
        marginTop: '8px',
      }}>
        {children}
      </Container>
    </Container>
  );
}
