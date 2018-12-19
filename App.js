import React from 'react';
import { Provider } from 'react-redux';

import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './app/reducers/reducers';

import AppNavigator from './AppNavigator'

const loggerMiddleware = createLogger()

const store = createStore(rootReducer, applyMiddleware(
  thunkMiddleware, loggerMiddleware));

export default class App extends React.Component {
  render(){
    return(
      <Provider store={store}>
        <AppNavigator/>
      </Provider>
      )
  }
}

