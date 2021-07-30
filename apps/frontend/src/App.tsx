import React from 'react';

import { Container } from '@material-ui/core';
import Erc20Page from './components/pages/Erc20Page';

export function App() {
  return (
    <Container maxWidth="md">
      <Erc20Page />
    </Container>
  );
}

export default App;
