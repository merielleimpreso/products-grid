import _ from 'underscore';
import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {RaisedButton} from 'material-ui';
import Header from './components/Header';
import ProductGridList from './components/ProductGridList';
import Ads from './components/Ads';

class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      sortBy: 'none',
    };
    this.render = this.render.bind(this);
    this.sortProductsBy = this.sortProductsBy.bind(this);
  }

  componentDidMount() {
    fetch('http://localhost:3000/products')
    .then(response => response.json())
    .then(responseJSON => {
      console.log(responseJSON);
      this.setState({
        products: responseJSON
      });
    });
  }

  sortProductsBy(sortName) {
    console.log(sortName);
    this.setState({
      products: _.sortBy(this.state.products, sortName)
    });
  }

  render() {
    return <MuiThemeProvider>
    <div>
    <Header sortProductsBy={this.sortProductsBy} />
    <ProductGridList products={this.state.products} />
    <Ads />
    </div>
    </MuiThemeProvider>
  }

}

ReactDOM.render(
  <Application />,
  document.getElementById('app')
)
