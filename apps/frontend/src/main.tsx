import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';

import App from './App';
import Providers from './Providers';

ReactDOM.render(
  <Providers>
    <App />
  </Providers>,
  document.getElementById('root')
);
