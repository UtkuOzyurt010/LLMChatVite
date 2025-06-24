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
