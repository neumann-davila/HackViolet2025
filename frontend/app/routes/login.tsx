import React, { useState } from "react";
import type { MetaFunction } from '@remix-run/node';
import { Link as RemixLink, useLocation } from '@remix-run/react';
import { Typography, Box, Container, Tabs, Alert, TextField, Button, Paper} from '@mui/material';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export const meta: MetaFunction = () => [
  { title: 'Teacher Aid Login' },
  { name: 'A classroom tool to help bridge the gap between teacher and student', content: 'Welcome to Teacher Aid!' },
];

export default function Login() {

  // State for form inputs and error handling
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    // Simulate login API call
    console.log("Logging in with:", { email, password });
    setError("");
    alert(`Logged in as ${email}`);
  };

  return (
    <React.Fragment>
      <Container maxWidth="xs">
        <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
					<Box
							sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							}}
					>
						<LockOutlinedIcon sx={{ fontSize: 40, color: "primary.main" }} />
						<Typography variant="h5" component="h1" sx={{ mt: 2 }}>
						Login
						</Typography>

						{/* Error message */}
						{error && (
						<Alert severity="error" sx={{ width: "100%", mt: 2 }}>
								{error}
						</Alert>
						)}

							{/* Login form */}
						<Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: "100%" }}>
							<TextField
									label="Email"
									type="email"
									fullWidth
									margin="normal"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
							/>
							<TextField
									label="Password"
									type="password"
									fullWidth
									margin="normal"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
							/>
							<Button
									type="submit"
									fullWidth
									variant="contained"
									sx={{ mt: 3, mb: 2 }}
							>
              	Login
            	</Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </React.Fragment>
  );
}

