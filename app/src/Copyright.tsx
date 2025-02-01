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
      Replace This With Your Name!
      {new Date().getFullYear()}.
    </Typography>
  );
}
