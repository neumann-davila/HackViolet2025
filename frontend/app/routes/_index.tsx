import * as React from 'react';
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import { TextField, InputAdornment, IconButton, Container, Box, Typography } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';

export default function Index() {
  const navigate = useNavigate(); // Initialize the navigate function
  const [code, setCode] = React.useState(''); // State to hold the entered code

  // Function to handle code submission
  const handleSubmit = () => {
    if (code === 'ABC123') {
      // Navigate to the TeacherView if code matches
      navigate('/TeacherView');
    } else {
      // Handle invalid code (optional)
      alert('Invalid code!');
    }
  };

  // PageContent Component
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
    };

    return (
      <Box display="flex" justifyContent="center" width="100%">
        <Box display="flex" flexDirection="column" width={widthMap[size]}>
          {/* Big Cool Header Text For Website Name */}
          <Box
            display="flex"
            flexDirection="column"
            sx={{
              pb: paddingMap[size],
              mb: marginMap[size],
              borderBottom: (theme) => `2px solid ${theme.palette.divider}`,
            }}
          >
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
            <Typography variant="h5" sx={{ fontWeight: 500 }}>
              Asking questions has never been easier!
            </Typography>
          </Box>

          {/* Classroom Code Entry */}
          <TextField
            id="code-entry"
            label="Enter Classroom Join Code"
            variant="outlined"
            value={code} // This binds the value to the state
            onChange={(e) => setCode(e.target.value)} // This properly updates the state for every keystroke
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end" sx={{ marginRight: 1 }}>
                    <IconButton edge="end" color="primary" onClick={handleSubmit}>
                      <LoginIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
            fullWidth // Make sure the TextField occupies the available space
            autoFocus // Focus the input when the component is mounted
          />
        </Box>
      </Box>
    );
  };

  return (
    <React.Fragment>
      {/* Responsive Containers */}
      {/* Large Screen */}
      <Container
        disableGutters
        maxWidth="xl"
        sx={{
          display: { xs: "none", sm: "none", md: "grid" },
          mt: 12,
        }}
      >
        <PageContent size="md" />
      </Container>

      {/* Medium Screen */}
      <Container
        disableGutters
        maxWidth="xl"
        sx={{
          display: { xs: "none", sm: "grid", md: "none" },
          mt: 12,
          alignItems: "center",
        }}
      >
        <PageContent size="sm" />
      </Container>

      {/* Small Screen */}
      <Container
        disableGutters
        maxWidth="xl"
        sx={{
          display: { xs: "grid", sm: "none", md: "none", lg: "none", xl: "none" },
          mt: 8,
          alignItems: "center",
        }}
      >
        <PageContent size="xs" />
      </Container>
    </React.Fragment>
  );
}


