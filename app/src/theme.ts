import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const darkTheme = createTheme({
  cssVariables: true,
  palette: {
    mode: 'dark',
    background: {
      default: '#1b1c27',
      paper: '#2b2c38',
    },
    divider: '#494a55',
    text: {
      primary: '#fef9ec',
    },
    primary: {
      main: '#8aa96a',
      contrastText: '#141521',
    },
    secondary: {
      main: '#53ae9d',
      contrastText: '#141521',
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: '"Petrona", serif',
  },
});

export default darkTheme;
