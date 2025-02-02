import * as React from 'react';
import { Link, useNavigate } from "react-router-dom";
import type { MetaFunction } from '@remix-run/node';
import { Link as RemixLink, useLocation } from '@remix-run/react';
import { Typography, Box, Container, Tabs, Tab, TextField, Button, Stack, InputAdornment, IconButton} from '@mui/material';
import darkTheme from '~/src/theme';
import LoginIcon from '@mui/icons-material/Login';

export const meta: MetaFunction = () => [
  { title: 'TeacherAid' },
  { name: 'A classroom tool to help bridge the gap between teacher and student', content: 'Welcome to Teacher Aid!' },
];

/* Page Content for Better Dynamic Scaling */
const PageContent = ({ size = "md" }: { size?: "md" | "sm" | "xs" }) => {
  const paddingMap = {
    md: 3,
    sm: 2,
    xs: 1,
  };

  const marginMap = {
    md: 4,
    sm: 3,
    xs: 2,
  };

  const widthMap = {
    md: "50%",
    sm: "75%",
    xs: "100%",
  }

  return(
    <Box display="flex" justifyContent="center" width="100%">
      <Box display="flex" flexDirection="column" width={widthMap[size]}>
        {/* Big Cool Header Text For Website Name */}
        <Box display="flex" flexDirection="column" sx={{
          pb: paddingMap[size],
          mb: marginMap[size],
          borderBottom: (theme) => `2px solid ${theme.palette.divider}`,
        }}>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 500,
              color: "transparent",
              backgroundImage: (theme) =>
                `linear-gradient(.25turn, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: "text",
            }}
          >
            TeacherAid
          </Typography>
          <Typography variant="h5" sx={{fontWeight: 500,}}>
            Asking questions has never been easier!
          </Typography>
        </Box>

        {/* Classroom Code Entry */}
        <TextField
          id="code-entry"
          label="Enter Classroom Join Code"
          variant="outlined"
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
          }}
        />

        {/* Temporary Buttons to Navigate to Random Screens */}
        <Typography variant="h5" sx={{mt: 8, mb: 2}}>
          Temporary Nav Buttons
        </Typography>
        <Box display="flex" width={widthMap[size]} gap={2}>
          <RemixLink to="/studentView" style={{ textDecoration: 'none' }}>
            <Button variant='contained'>Student View</Button>
          </RemixLink>
          <RemixLink to="/TeacherView" style={{ textDecoration: 'none' }}>
            <Button variant='contained'>Teacher View</Button>
          </RemixLink>
        </Box>
      </Box>
    </Box>
  );
};

export default function Index() {
  return (
    <React.Fragment>
      {/* Responsive Containers */}

      {/* Large Screen */}
      <Container disableGutters maxWidth='xl' sx={{
        display: { xs: 'none', sm: 'none', md: 'grid'},
        mt: 12,
      }}>
        <PageContent size="md"/>
      </Container>
      
      {/* Medium Screen */}
      <Container disableGutters maxWidth='xl' sx={{
        display: { xs: 'none', sm: 'grid', md: 'none'},
        mt: 12,
        alignItems: 'center',
      }}>
        <PageContent size="sm"/>
      </Container>
      
      {/* Small Screen */}
      <Container disableGutters maxWidth='xl' sx={{
        display: { xs: 'grid', sm: 'none', md: 'none', lg: 'none', xl: 'none' },
        mt: 8,
        alignItems: 'center',
      }}>
        <PageContent size="xs"/>
      </Container>
    </React.Fragment>
  );
}
