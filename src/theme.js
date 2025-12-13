import { createTheme } from '@mui/material/styles';

// Choose one of these themes by uncommenting:

// ===== OPTION 1: Purple & Pink (Sweet Shop Vibe) =====
/*
export const theme = createTheme({
  palette: {
    primary: {
      main: '#9c27b0', // Purple
      light: '#ba68c8',
      dark: '#6a1b9a',
    },
    secondary: {
      main: '#ff1493', // Deep Pink
      light: '#ff69b4',
      dark: '#c2185b',
    },
    background: {
      default: '#faf8fb',
      paper: '#ffffff',
    },
    text: {
      primary: '#2c2c2c',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 600,
    },
  },
});
*/

// ===== OPTION 2: Orange & Warm (Cozy Bakery) =====
export const theme = createTheme({
  palette: {
    primary: {
      main: '#ff9800', // Orange
      light: '#ffb74d',
      dark: '#e65100',
    },
    secondary: {
      main: '#ff6f00', // Deep Orange
      light: '#ffb74d',
      dark: '#bf360c',
    },
    background: {
      default: '#fffbf0',
      paper: '#ffffff',
    },
    text: {
      primary: '#3e2723',
      secondary: '#795548',
    },
  },
});

// ===== OPTION 3: Teal & Green (Fresh) =====
/*
export const theme = createTheme({
  palette: {
    primary: {
      main: '#009688', // Teal
      light: '#4db6ac',
      dark: '#00695c',
    },
    secondary: {
      main: '#4caf50', // Green
      light: '#81c784',
      dark: '#2e7d32',
    },
    background: {
      default: '#f1f8e9',
      paper: '#ffffff',
    },
  },
});
*/

// ===== OPTION 4: Red & Gold (Elegant) =====
/*
export const theme = createTheme({
  palette: {
    primary: {
      main: '#d32f2f', // Red
      light: '#ef5350',
      dark: '#b71c1c',
    },
    secondary: {
      main: '#fbc02d', // Gold
      light: '#fdd835',
      dark: '#f57f17',
    },
    background: {
      default: '#fef9e7',
      paper: '#ffffff',
    },
  },
});
*/

// ===== OPTION 5: Dark Mode (Modern) =====
/*
export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#bb86fc', // Purple
      light: '#e0b0ff',
      dark: '#8858e6',
    },
    secondary: {
      main: '#03dac6', // Cyan
      light: '#66fff9',
      dark: '#00b8a9',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
});
*/

export default theme;
