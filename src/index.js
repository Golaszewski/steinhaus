import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MyApp from './App';
import * as serviceWorker from './serviceWorker';
import CytoscapeComponent from 'react-cytoscapejs';
import {Provider,connect} from 'react-redux'
//import rootReducer from './reducers'
import { createStore } from 'redux'
import {todoApp} from './App'
import {store} from './App'

//ReactDOM.render( React.createElement(MyApp, document.getElementById('root')));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <MyApp />
    </Provider>
  </React.StrictMode>,
  
  document.getElementById('root')
);


serviceWorker.unregister();
