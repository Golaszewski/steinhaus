import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MyApp from './App';
import * as serviceWorker from './serviceWorker';
import CytoscapeComponent from 'react-cytoscapejs';

//ReactDOM.render( React.createElement(MyApp, document.getElementById('root')));

ReactDOM.render(
  <React.StrictMode>
    <MyApp />
  </React.StrictMode>,
  document.getElementById('root')
);


serviceWorker.unregister();
