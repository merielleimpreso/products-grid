import _ from 'underscore';
import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {RaisedButton} from 'material-ui';
import Header from './components/Header';
import ProductGridList from './components/ProductGridList';
import Ads from './components/Ads';
import addUtils from './utils';

import { createMuiTheme } from 'material-ui/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#B3E5FC',
      dark: '#81D4FA',
      contrastText: '#1A237E',
    },
  },
});

class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      newProducts: [],
      fetchedProducts: [],
      page: 1,
      hasMoreProducts: true,
      sortBy: '',
      allowFetch: true,
    };
    this.query = this.query.bind(this);
    this.sortProductsBy = this.sortProductsBy.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    addUtils();
    this.query(_.getProductsLink(this.state.page, ''));
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.page != prevState.page || this.state.sortBy != prevState.sortBy) {
      this.query(_.getProductsLink(this.state.page, this.state.sortBy));
    }
    if (JSON.stringify(this.state.newProducts) != JSON.stringify(prevState.newProducts)) {
      this.setState({
        fetchedProducts: _.union(this.state.newProducts, this.state.fetchedProducts)
      });
      if (this.state.page == 1) {
        this.setState({
          products: _.union(this.state.newProducts, this.state.product)
        });
      }
    }
    if (this.state.hasMoreProducts && this.state.allowFetch) {
      this.setState({
        page: this.state.page + 1
      });
      console.log(this.state.page);
    }
  }

  query(link) {
    if (this.state.hasMoreProducts && this.state.allowFetch) {
      this.setState ({
        allowFetch: false
      });
      fetch(link)
      .then(response => response.json())
      .then(responseJSON => {
        if (JSON.stringify(responseJSON) != this.state.newProducts) {
          if (responseJSON.length != 0) {
            let newProducts = responseJSON;
            let randomNumber = Math.floor(Math.random()*1000);
            let sourceUrl = `http://localhost:3000/ads/?r=${randomNumber}`;
            newProducts.push({
              id: Date.now() + Math.random() + '_ads_' + randomNumber,
              source: sourceUrl
            });
            this.setState({
              newProducts: responseJSON,
              allowFetch: true
            });
          } else {
            this.setState({
              hasMoreProducts: false,
              allowFetch: false,
            });
          }
        }
      });
    }
  }

  sortProductsBy(sortName) {
    console.log(sortName);
    this.setState({
      allowFetch: true,
      products: [],
      fetchedProducts:[],
      newProducts: [],
      page: 1,
      hasMoreProducts: true,
      sortBy: sortName
    })
    this.query(_.getProductsLink(this.state.page, this.state.sortBy));
  }

  handleScroll() {
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;

    if (windowBottom >= docHeight) {
      this.setState({
        products: this.state.fetchedProducts,
      });
    } else {
      this.setState({
        message:'not at bottom'
      });
    }
  }

  render() {
    return <MuiThemeProvider theme={theme}>
    <div>
      <Header sortProductsBy={this.sortProductsBy} />
      <ProductGridList products={this.state.products} hasMoreProducts={this.state.hasMoreProducts} />
    </div>
    </MuiThemeProvider>
  }

}

ReactDOM.render(
  <Application />,
  document.getElementById('app')
)
