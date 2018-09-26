import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'

import './index.css';
import App from './App';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers'

import CssBaseline from '@material-ui/core/CssBaseline';


import thunk from 'redux-thunk'

const store = createStore(rootReducer, applyMiddleware(thunk))

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {main: '#c43e00'},
    secondary: {main: '#6ff9ff'}
  },
  status: {
    danger: '#ddc700',
    error: '#bc0042'
  }
})



ReactDOM.render(<Provider store={store}>
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Router>
      <App />
    </Router>
</MuiThemeProvider>
</Provider>, document.getElementById('root'));
