import React, { useState } from "react";
import type { MetaFunction } from '@remix-run/node';
import { Link as RemixLink} from '@remix-run/react';
import { Typography, Box, Container, Tabs, Alert, TextField, Button, Paper, Chip} from '@mui/material';
import Grid from '@mui/material/Grid2';
import AddIcon from "@mui/icons-material/Add";

interface Classroom {
  id: string;
  courseName: string;
}

export const meta: MetaFunction = () => [
  { title: 'Teacher Dashboard' },
  { name: 'A classroom tool to help bridge the gap between teacher and student', content: 'Welcome to Teacher Aid!' },
];

export default function Dashboard() {
	// State to manage classrooms
  const [classrooms, setClassrooms] = useState<Classroom[]>([
    { id: "MATH101", courseName: "Introduction to Calculus" },
    { id: "PHYS201", courseName: "Classical Mechanics" },
  ]);

  // Function to create a new classroom
  const createNewClassroom = () => {
    const newClassroom: Classroom = {
      id: `CLASS-123456`, // Generate a unique ID
      courseName: `New Course ${classrooms.length + 1}`, // Default course name
    };
    setClassrooms([...classrooms, newClassroom]);
  };

  return (
    <React.Fragment>
			<Container maxWidth="lg" sx={{ mt: 4 }}>
				{/* Header with title and "New Classroom" button */}
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						mb: 4,
					}}
				>
					<Typography variant="h4" component="h1">
						My Classrooms
					</Typography>
					<Button
						variant="contained"
						startIcon={<AddIcon />}
						onClick={createNewClassroom}
					>
						New Classroom
					</Button>
				</Box>

				{/* List of classrooms */}
				{classrooms.length === 0 ? (
					<Box
						sx={{
							textAlign: "center",
							p: 8,
							backgroundColor: "action.hover",
							borderRadius: 2,
						}}
					>
						<Typography variant="h6" color="textSecondary">
							No classrooms found. Create your first classroom!
						</Typography>
					</Box>
				) : (
					<Grid container spacing={3}>
						{classrooms.map((classroom) => (
							<Grid sx={{ xs: 12, sm: 6, md: 4 }} key={classroom.id}>
								<Paper
									sx={{
										p: 3,
										height: "100%",
										display: "flex",
										flexDirection: "column",
										gap: 1,
										transition: "transform 0.2s",
										"&:hover": {
											transform: "translateY(-4px)",
											boxShadow: 3,
										},
									}}
								>
									<Typography variant="h6">{classroom.courseName}</Typography>
									<Chip
										label={`ID: ${classroom.id}`}
										variant="outlined"
										size="small"
										sx={{ alignSelf: "flex-start" }}
									/>
									<Box sx={{ mt: 2, display: "flex", gap: 1 }}>
										<Button variant="outlined" size="small">
											View Class
										</Button>
										<Button variant="outlined" size="small" color="secondary">
											Settings
										</Button>
									</Box>
								</Paper>
							</Grid>
						))}
					</Grid>
				)}
			</Container>
    </React.Fragment>
  );
}