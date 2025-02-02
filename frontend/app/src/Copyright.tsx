import * as React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export default function Copyright() {
  return (
    <Typography
      variant="body2"
      align="center"

      sx={{
        color: 'text.secondary',
      }}
    >
      {'Copyright © '}
      TeacherAid
      {new Date().getFullYear()}.
    </Typography>
  );
}
