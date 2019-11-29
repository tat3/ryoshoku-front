import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import ReactGA from 'react-ga'
import { createBrowserHistory } from 'history'
import App from './App';
import theme from './theme';

const history = createBrowserHistory()

const { NODE_ENV } = process.env

if (NODE_ENV === 'development') {
  ReactGA.initialize(process.env.REACT_APP_GA as string)
  history.listen(({ pathname }) => {
    ReactGA.set({ page: pathname });
    ReactGA.pageview(pathname);
  })
}

ReactDOM.render(
  <ThemeProvider theme={theme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    <App />
  </ThemeProvider>,
  document.querySelector('#root'),
);
