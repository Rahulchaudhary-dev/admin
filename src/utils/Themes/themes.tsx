import { ThemeOptionsType } from '../../types/app-wrapper.types';

const primaryColorDark: string = '#FFFFFF';
const primaryColorLight: string = '#fff';
const customTextColor: string = '#171A1D';
const customColor: string = '#171A1D';

// A custom dark theme for this app
const darkTheme: ThemeOptionsType = {
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  typography: {
    fontFamily: [
      'Playfair Display',
      'Rubik',
      '-apple-system',
      'Roboto',
      'Arial',
      '"Apple Color Emoji"',
    ].join(','),
    fontSize: 14,
  },

  palette: {
    mode: 'dark',
    primary: {
      main: primaryColorDark,
      contrastText: '#171A1D',
    },
    background: {
      default: primaryColorDark,
      paper: '#171A1D',
    },
    text: {
      secondary: '#666666',
    },
    divider: '#B89D4F',
  },
  customPalette: {
    borderColor: customColor,
    textColor: customTextColor,
    mainColor: customColor,
  },
  components: {
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontFamily: 'Rubik !important',
          fontWeight: 500,
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: '#CCCCCC  transparent',
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            backgroundColor: 'transparent ',
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            borderRadius: 8,
            backgroundColor: '#CCCCCC ',
            minHeight: 14,
            border: '1px solid ##CCCCCC ',
          },
          '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
            backgroundColor: 'transparent',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: '#181A1D',
          paddingLeft: '4rem',
          paddingRight: '4rem',
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          padding: '0px',
          background: 'transparent',
          fontFamily: 'Rubik',
          fontSize: '16px',
          outline: 'none',
          borderBottom: '1px solid #CCCCCC',
          borderTop: '0px',
          borderLeft: '0px',
          borderRight: '0px',
          width: '100%',
          '& select': {
            paddingLeft: '4px !important',
          },
          '& select:not([multiple]) optgroup': {
            backgroundColor: 'white',
            color: 'black',
          },
          '& select:not([multiple]) option': {
            backgroundColor: 'white',
            color: 'black',
          },
        },
        icon: {
          fill: 'black',
        },
        select: {
          color: '#666666',
          paddingLeft: '2px',
          background: 'white',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontFamily: 'Rubik',
          color: '#666666',
          ':hover': {
            background: '#F8F8F8',
          },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          background: 'white',
          '&& .Mui-selected': {
            background: '#CCCCCC',
          },
          gap: '10px',
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          color: '#CCCCCC',
          fontWeight: 300,
          border: '1px solid #CCCCCC',
          backgroundColor: 'white',
          '&.Mui-selected': {
            color: '#171A1D',
            fontWeight: 400,
            border: '2px solid #171A1D',
            backgroundColor: 'white',
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          paddingTop: 0,
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          fontFamily: 'Rubik !important',
          fontSize: '12px',
          padding: '0px',
          display: 'flex !important',
          alignItems: 'flex-end',
        },
      },
    },
  },
};

// A custom light theme for this app
const lightTheme: ThemeOptionsType = {
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  typography: {
    fontFamily: [
      'Playfair Display',
      'Rubik',
      '-apple-system',
      'Roboto',
      'Arial',
      '"Apple Color Emoji"',
    ].join(','),
  },
  palette: {
    mode: 'light',
    primary: {
      main: primaryColorLight,
    },
    background: {
      default: primaryColorLight,
    },
  },
  components: {
    MuiInput: {
      styleOverrides: {
        input: {
          '&[aria-disabled="true"]': {
            color: 'black',
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: '#FFFFFF',
          scrollbarColor: '#6b6b6b #2b2b2b',
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            backgroundColor: '#2b2b2b',
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            borderRadius: 8,
            backgroundColor: '#6b6b6b',
            minHeight: 24,
            border: '3px solid #2b2b2b',
          },
          '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus':
            {
              backgroundColor: '#959595',
            },
          '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active':
            {
              backgroundColor: '#959595',
            },
          '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover':
            {
              backgroundColor: '#959595',
            },
          '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
            backgroundColor: '#2b2b2b',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: '#181A1D',
          paddingLeft: '8rem',
          paddingRight: '8rem',
        },
      },
    },
  },
};

export { lightTheme, darkTheme };
