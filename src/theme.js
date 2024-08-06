import { createTheme } from '@mui/material/styles';
import { grey, indigo, pink, yellow } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    common: {
      black: '#000000',
      white: '#FFFFFF',
    },
    primary: {
      main: indigo[500],
      light: indigo[300],
      dark: indigo[700],
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: pink[500],
      light: pink[300],
      dark: pink[700],
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#F44336',
      light: '#E57373',
      dark: '#D32F2F',
      contrastText: '#FFFFFF',
    },
    warning: {
      main: yellow[700],
      light: yellow[500],
      dark: yellow[900],
      contrastText: '#000000',
    },
    info: {
      main: indigo[500],
      light: indigo[300],
      dark: indigo[700],
      contrastText: '#FFFFFF',
    },
    success: {
      main: '#4CAF50',
      light: '#81C784',
      dark: '#388E3C',
      contrastText: '#FFFFFF',
    },
    grey: {
      main: grey[500],
      light: grey[300],
      dark: grey[700],
      contrastText: '#000000',
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
      disabled: '#BDBDBD',
      hint: '#9E9E9E',
    },
    background: {
      default: '#F5F5F6',
      paper: '#FFFFFF',
    },
    divider: '#BDBDBD',
  },
  typography: {
    fontFamily: ['Arial', 'sans-serif'].join(','),
    h1: {
      fontSize: '2rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '1.75rem',
      fontWeight: 700,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 700,
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 700,
    },
    h5: {
      fontSize: '1rem',
      fontWeight: 700,
    },
    h6: {
      fontSize: '0.875rem',
      fontWeight: 700,
    },
    body1: {
      fontSize: '1rem',
    },
    body2: {
      fontSize: '0.875rem',
    },
  },
});

export default theme;
