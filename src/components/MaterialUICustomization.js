import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import GilroyRegular from '../assets/fonts/Gilroy-Regular.ttf';
// import { StylesProvider } from '@mui/styles';
import StyledEngineProvider from '@mui/material/StyledEngineProvider';

const theme = createTheme({
  typography: {
    fontFamily: 'Gilroy, Arial, serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Gilroy';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: url(${GilroyRegular}) format('truetype');
        }
      `,
    },
  },
});

const MaterialUICustomization = ({ children }) => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </StyledEngineProvider>
  );
};

export default MaterialUICustomization;
