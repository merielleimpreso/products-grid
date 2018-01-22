import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {RaisedButton} from 'material-ui';
import Header from './components/Header';

function Application() {
  return <MuiThemeProvider> <div>
  <Header />

  </div>
  </MuiThemeProvider>
}

ReactDOM.render(
  <Application />,
  document.getElementById('app')
)
