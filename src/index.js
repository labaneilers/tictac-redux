import { createStore } from 'redux';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './containers/AppContainer';
import tictactoe from './reducers';
import './index.css';

let store = createStore(tictactoe);

ReactDOM.render(
  <Provider store={store}>
  	<AppContainer />
  </Provider>,
  document.getElementById('root')
);
