import { ReactElement } from 'react';
import defaultTheme from '../../configuration/theme';
import { ThemeProvider } from '@material-ui/core';

const withThemeProvider = (
  tree: ReactElement,
  theme = defaultTheme
): ReactElement => <ThemeProvider theme={theme}>{tree}</ThemeProvider>;

export default withThemeProvider;
