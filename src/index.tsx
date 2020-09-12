import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { RecoilRoot } from 'recoil';
import CssBaseline from "@material-ui/core/CssBaseline";

// import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.Fragment>
  {/*<React.StrictMode>*/}
    <RecoilRoot>
      <CssBaseline />
      <App />
    </RecoilRoot>
  {/*</React.StrictMode>,*/}
  </React.Fragment>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
