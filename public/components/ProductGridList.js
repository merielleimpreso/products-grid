import _ from 'underscore';
import Ads from './Ads';

import React from 'react';
import calculateSize from 'calculate-size';

import { withStyles } from 'material-ui/styles';
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import InfoIcon from 'material-ui-icons/Info';
import Subheader from 'material-ui/List/ListSubheader';
import Typography from 'material-ui/Typography';
import { CircularProgress } from 'material-ui/Progress';
import StarBorderIcon from 'material-ui-icons/StarBorder';


import Footer from './Footer';

const GRID_LIST_WIDTH = 1200;
const GRID_LIST_COL = 5;
const GRID_LIST_CELL = 1200 / 5;
const ADS_COUNT = 20;

const styles = theme => ({
  root: {
    marginTop: 100,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: GRID_LIST_WIDTH,
  },
  gridListTile: {
    height:'100vh',
    textAlign:'center',
    backgroundColor:'#ECEFF1',
    paddingTop: 20,
  },
  icon: {
    color: 'white',
  },
});

class ProductGridList extends React.Component {
  render() {
    const { classes } = this.props;

    return <div className={classes.root}>
      <GridList cellheight={200} cols={GRID_LIST_COL} className={classes.gridList}>
        {
          this.props.products.map((product, index) => {
            return (product.hasOwnProperty('source'))
              ? productGridListTileWithAds(product, classes.gridListTile)
              : productGridListTile(product, classes.gridListTile);
          })
        }
        <GridListTile key={'footer'} cols={GRID_LIST_COL} cellheight={80} style={{textAlign:'center'}}>
           <Footer hasMoreProducts={this.props.hasMoreProducts}/>
        </GridListTile>
      </GridList>
    </div>
  }
}

const productGridListTile = (product, className, className1) => {
  let size = calculateSize(product.face, {
    font: 'Roboto',
    fontSize: `${product.size}px`
  });
  let colSize = Math.ceil(size.width / GRID_LIST_CELL);

  let title = <span>{_.formatPriceToDollars(product.price)} <span style={{float:'right'}}>{product.size}px</span></span>
  let subtitle = <span>{product.id} <span style={{float:'right'}}>{_.formatDateToRelative(product.date)}</span></span>
  return (
    <GridListTile key={product.id} cols={colSize} style={{alignItems:'center'}} title={product.id}>
      <Typography type="body1" color="inherit" className={className} style={{fontSize: `${product.size}px`}}>
        {product.face}
      </Typography>
      <GridListTileBar
        title={title}
        subtitle={subtitle}
        style={className1}
      />
    </GridListTile>
  );
}

const productGridListTileWithAds = (product, className) => {
  let tile = productGridListTile(product, className);
  return (
    <GridListTile key={product.id} cols={GRID_LIST_COL} cellheight={200}>
      <div style={{textAlign:'center', backgroundColor:'#FFCCBC', height:'100hv'}}>
        <Ads source={product.source}/>
      </div>
      <GridListTileBar
        title={'A word from our sponsor'}
        actionIcon={
          <IconButton style={{color: 'white'}}>
            <StarBorderIcon />
          </IconButton>
        }
        actionPosition="right"
      />
    </GridListTile>
  );
}


export default withStyles(styles)(ProductGridList);
