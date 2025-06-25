// theme.js or theme.ts
import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface Palette {
      custom: {
        bggray: string;
      };
    }
  
    interface PaletteOptions {
      custom?: {
        bggray: string;

      };
    }
  }

const theme = createTheme({
  transitions: {
    // easing: {
    //   easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    //   easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
    //   easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    //   sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    // },
    duration: {
      // shortest: 100,
      // shorter: 100,
      // short: 100,
      // standard:100,
      // complex: 100,
      //enteringScreen: 300,
      //leavingScreen: 500
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          minWidth: '0px',
        },
      },
    },
  },
  palette: {
    custom: {
        bggray: '#f8f8f8', 
    },
  },
});



export default theme;
