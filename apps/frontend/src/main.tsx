import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';
import theme from '@coinconket/shared/configuration/theme';
import Slide from '@material-ui/core/Slide';

import App from './App';

ReactDOM.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <App />
      </SnackbarProvider>
    </ThemeProvider>
  </StrictMode>,
  document.getElementById('root')
);
