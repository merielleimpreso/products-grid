import _ from 'underscore';
import addUtils from './utils';
import { createMuiTheme } from 'material-ui/styles';
import Header from './components/Header';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ProductGridList from './components/ProductGridList';
import React from 'react';
import ReactDOM from 'react-dom';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#B3E5FC',
      dark: '#81D4FA',
      contrastText: '#1A237E',
    },
  }
});

class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [], // Products displayed
      fetchedProducts: [], // Fetched products
      newProducts: [], // New products from query
      page: 1, // Pagination
      hasMoreProducts: true, // Checking if there are still products to load
      sortBy: '',
      allowFetch: true, // For query, allow fetching of product if previous query is done
    };
    this.query = this.query.bind(this);
    this.sortProductsBy = this.sortProductsBy.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    addUtils(); // Load helper methods
    this.query(_.getProductsLink(this.state.page, '')); // Initial product fetching
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  componentDidUpdate(prevProps, prevState) {
    // If there's a change in page or sortBy, call query
    if (this.state.page != prevState.page || this.state.sortBy != prevState.sortBy) {
      this.query(_.getProductsLink(this.state.page, this.state.sortBy));
    }

    // Put new products in fetched products, display initial products if page = 1
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

    // Increment page if allowed
    if (this.state.hasMoreProducts && this.state.allowFetch) {
      this.setState({
        page: this.state.page + 1
      });
    }
  }

  query(link) {
    if (this.state.hasMoreProducts && this.state.allowFetch) {
      this.setState ({ allowFetch: false }); // Disallow fetching if query has not yet done responding

      fetch(link)
      .then(response => response.json())
      .then(responseJSON => {
        if (JSON.stringify(responseJSON) != this.state.newProducts) {
          if (responseJSON.length != 0) {
            let newProducts = responseJSON;

            // Insert ads every after 20 products
            let randomNumber = Math.floor(Math.random()*1000);
            let sourceUrl = `http://localhost:3000/ads/?r=${randomNumber}`;
            newProducts.push({
              id: Date.now() + Math.random() + '_ads_' + randomNumber,
              source: sourceUrl
            });

            // Update new products and enable fetching
            this.setState({
              newProducts: responseJSON,
              allowFetch: true
            });
          } else {
            // End of catalogue
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
    // Called when sortBy field was changed, re-initialize states
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
    // Computation for bottom scrolling
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;

    // At the bottom, display fetched products
    if (windowBottom >= docHeight) {
      this.setState({
        products: this.state.fetchedProducts,
      });
    }
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div>
          <Header sortProductsBy={this.sortProductsBy} />
          <ProductGridList products={this.state.products} hasMoreProducts={this.state.hasMoreProducts} />
        </div>
      </MuiThemeProvider>
    );
  }

}

ReactDOM.render(
  <Application />,
  document.getElementById('app')
)
