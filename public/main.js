import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {RaisedButton} from 'material-ui';
import Header from './components/Header';
import ProductGridList from './components/ProductGridList';

function Application() {
  return <MuiThemeProvider>
  <div>
  <Header />
  <ProductGridList />
  </div>
  </MuiThemeProvider>
}

ReactDOM.render(
  <Application />,
  document.getElementById('app')
)
