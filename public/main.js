import _ from 'underscore';
import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {RaisedButton} from 'material-ui';
import Header from './components/Header';
import ProductGridList from './components/ProductGridList';
import Ads from './components/Ads';
import addUtils from './utils';

class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      page: 1,
    };
    this.query = this.query.bind(this);
    this.sortProductsBy = this.sortProductsBy.bind(this);
  }

  componentDidMount() {
    addUtils();
    this.query(_.getProductsLink(this.state.page, ''));
  }

  query(link) {
    fetch(link)
    .then(response => response.json())
    .then(responseJSON => {
      this.setState({
        products: responseJSON
      });
    });
  }

  sortProductsBy(sortName) {
    this.query(_.getProductsLink(this.state.page, sortName));
  }

  render() {
    return <MuiThemeProvider>
    <div>
      <Header sortProductsBy={this.sortProductsBy} />
      <ProductGridList products={this.state.products} />
    </div>
    </MuiThemeProvider>
  }

}

ReactDOM.render(
  <Application />,
  document.getElementById('app')
)
