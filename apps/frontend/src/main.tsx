import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';

import App from './App';
import Providers from './Providers';

ReactDOM.render(
  <StrictMode>
    <Providers>
      <App />
    </Providers>
  </StrictMode>,
  document.getElementById('root')
);
