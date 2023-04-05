import { PaletteMode } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { blue, cyan, grey, red, orange, green, common } from '@mui/material/colors';

const getDesignTokens = (mode: PaletteMode = 'dark') => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // palette values for light mode
          primary: {
            main: blue[500],
            contrastText: common.white,
          },
          secondary: {
            main: cyan[300],
            contrastText: common.white,
          },
          background: {
            paper: grey[200],
            default: common.white,
          },
          text: {
            primary: grey[900],
            secondary: grey[700],
          },
          error: {
            main: red[500],
          },
          warning: {
            main: orange[500],
          },
          info: {
            main: blue[600],
          },
          success: {
            main: green[500],
          },
        }
      : {
          // palette values for dark mode
          primary: {
            main: blue[500],
            contrastText: common.white,
          },
          secondary: {
            main: cyan[300],
            contrastText: common.white,
          },
          background: {
            default: grey[900],
            paper: grey[800],
          },
          text: {
            primary: common.white,
            secondary: grey[300],
          },
          error: {
            main: red[500],
          },
          warning: {
            main: orange[500],
          },
          info: {
            main: blue[600],
          },
          success: {
            main: green[500],
          },
        }),
  },
});

const theme = createTheme({
  ...getDesignTokens(),
  typography: {
    fontFamily: 'Nunito Sans, sans-serif',
    // Add styles for variants here
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 400,
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 400,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
    },
    overline: {
      fontSize: '0.625rem',
      fontWeight: 400,
      textTransform: 'uppercase',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 'bold',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: 40,
          height: 40,
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          marginBottom: '8px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: '16px',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          '& .typing-indicator': {
            borderRadius: '50%',
            backgroundColor: grey[100],
            width: '8px',
            height: '8px',
            animation: '$bounce 1.4s infinite ease-in-out',
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        '@global': {
          '@keyframes bounce': {
            '0%, 100%': {
              transform: 'scale(0)',
            },
            '50%': {
              transform: 'scale(1)',
            },
          },
          '@keyframes grow': {
            '0%': {
              maxHeight: 0,
              opacity: 0,
            },
            '100%': {
              maxHeight: "100%",
              opacity: 0,
            },
          },
        },
      },
    },
    MuiGrid: {
      styleOverrides: {
        item: {
          '&.MuiGrid-item': {
            textAlign: 'center',
          },
        },
      },
    },
  },
});

export default theme;
