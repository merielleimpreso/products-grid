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
      newProducts: [],
      page: 1,
      hasMoreProducts: true,
      sortBy: '',
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
        products: _.union(this.state.newProducts, this.state.products)
      });
    }
  }

  query(link) {
    if (this.state.hasMoreProducts) {
      fetch(link)
      .then(response => response.json())
      .then(responseJSON => {
        if (JSON.stringify(responseJSON) != this.state.newProducts) {
          if (responseJSON.length != 0) {
            let newProducts = responseJSON;
            let randomNumber = Math.floor(Math.random()*1000);
            let sourceUrl = `http://localhost:3000/ads/?r=${randomNumber}`;
            newProducts.push({
              id: 'ads_' + randomNumber,
              source: sourceUrl
            });

            this.setState({
              newProducts: responseJSON
            });
          } else {
            console.log('no more product');
            this.setState({
              hasMoreProducts: false
            });
          }
        }
      });
    }
  }

  sortProductsBy(sortName) {
    this.setState({
      sortBy: sortName
    });
    this.query(_.getProductsLink(1, sortName));
  }

  handleScroll() {
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
      if (this.state.hasMoreProducts) {
        this.setState({
          page: this.state.page + 1
        });
        console.log(this.state.page);
      }
    } else {
      this.setState({
        message:'not at bottom'
      });
    }
  }

  render() {
    return <MuiThemeProvider>
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
