import React, { useState } from "react";
import type { MetaFunction } from '@remix-run/node';
import { Link as RemixLink, useLocation } from '@remix-run/react';
import { Typography, Box, Container, Tabs, Alert, TextField, Button, Paper} from '@mui/material';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export const meta: MetaFunction = () => [
  { title: 'Teacher Aid Sign-Up' },
  { name: 'A classroom tool to help bridge the gap between teacher and student', content: 'Welcome to Teacher Aid!' },
];

export default function SignUp() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!username || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

		attemptLogin();

    // Simulate sign-up API call
    console.log("Signing up with:", { username, email, password });
    setError("");
    alert(`Signed up as ${username}`);
  };


	const attemptLogin = async () => {
		const res = await fetch('http://localhost:5000/signUp', {
			method: "PUT",
			headers: {
        'Content-Type': 'application/json',
				},
			body: JSON.stringify({ 
				name: username,
				email: email,
				password: password,
				createdClasses: []
			})
		});

		/* Use to retrieve data
			* document.getElementById("result").innerHTML = localStorage.getItem("userName"); 
		*/
		localStorage.setItem("userName", username);

	}
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
							Sign Up
						</Typography>

						{/* Error message */}
						{error && (
							<Alert severity="error" sx={{ width: "100%", mt: 2 }}>
								{error}
							</Alert>
						)}

						{/* Sign-up form */}
						<Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: "100%" }}>
							<TextField
								label="Username"
								fullWidth
								margin="normal"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								required
							/>
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
							<TextField
								label="Confirm Password"
								type="password"
								fullWidth
								margin="normal"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								required
							/>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								sx={{ mt: 3, mb: 2 }}
							>
								Sign Up
							</Button>
						</Box>
					</Box>
				</Paper>
			</Container>
    </React.Fragment>
  );
}
