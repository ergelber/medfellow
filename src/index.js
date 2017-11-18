import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './App';
import configureStore from './store';

ReactDOM.render(<App store={configureStore()} />, 
  document.getElementById('root'));
