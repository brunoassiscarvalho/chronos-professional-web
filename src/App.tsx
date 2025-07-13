import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import SnackbarCloseButton from './components/molecules/SnackbarCloseButton';
import Router from './router/Router';
import customTheme from './styles/CustomTheme';

export default function App(): JSX.Element {
  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <SnackbarProvider
        maxSnack={3}
        action={(key) => <SnackbarCloseButton snacKey={key} />}
      >
        <Router />
      </SnackbarProvider>
    </ThemeProvider>
  );
}
