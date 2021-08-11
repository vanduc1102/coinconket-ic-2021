import { render } from '@testing-library/react';
import withThemeProvider from '@coinconket/shared/utils/testing/withThemeProvider';
import App from './app';

describe('App', () => {
  it.skip('should render successfully', () => {
    const { baseElement } = render(withThemeProvider(<App />));

    expect(baseElement).toBeTruthy();
  });

  it.skip('should have a greeting as the title', () => {
    const { getByText } = render(withThemeProvider(<App />));

    expect(getByText('Welcome to CoinConKet!')).toBeTruthy();
  });
});
