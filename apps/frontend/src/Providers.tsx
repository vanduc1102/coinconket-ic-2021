import React from 'react';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import { ConfirmProvider } from 'material-ui-confirm';
import theme from '@coinconket/shared/configuration/theme';
import { Web3ReactProvider } from '@web3-react/core';

import { getLibrary } from './utils/web3React';

const Providers: React.FC = ({ children }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ConfirmProvider>
          <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
          >
            {children}
          </SnackbarProvider>
        </ConfirmProvider>
      </ThemeProvider>
    </Web3ReactProvider>
  );
};

export default Providers;
