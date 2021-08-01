import React from 'react';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import theme from '@coinconket/shared/configuration/theme';
import { Web3ReactProvider } from '@web3-react/core';

import { getLibrary } from './utils/web3React';

const Providers: React.FC = ({ children }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          {children}
        </SnackbarProvider>
      </ThemeProvider>
    </Web3ReactProvider>
  );
};

export default Providers;
