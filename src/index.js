import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import Reducer from './reducers'

const store = createStore(Reducer, applyMiddleware(thunk, logger));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
