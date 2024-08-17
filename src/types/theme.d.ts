import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    customPalette: {
      borderColor: string;
      textColor: string;
      mainColor?: string;
    };
  }
  // This allows configuration of `createTheme`
  interface ThemeOptions {
    customPalette?: {
      borderColor?: string;
      textColor?: string;
      mainColor?: string;
    };
  }
}
