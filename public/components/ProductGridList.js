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

const GRID_LIST_WIDTH = 1000;
const GRID_LIST_COL = 4;
const GRID_LIST_CELL = 1000 / 4;
const ADS_COUNT = 20;

const styles = theme => ({
  root: {
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
    verticalAlign:'middle',
    alignItems:'center',
    backgroundColor:'#ECEFF1',
    padding:15,
  },
});

class ProductGridList extends React.Component {
  render() {
    const { classes } = this.props;

    return <div className={classes.root}>
      <GridList cellHeight={200} cols={GRID_LIST_COL} className={classes.gridList}>
        {
          this.props.products.map((product, index) => {
            return ((index + 1) % ADS_COUNT == 0)
              ? productGridListTileWithAds(product, classes.gridListTile)
              : productGridListTile(product, classes.gridListTile);
          })
        }
        <GridListTile key={'footer'} cols={GRID_LIST_COL}>
          <p>Loading...</p>
        </GridListTile>
      </GridList>
    </div>
  }
}

const productGridListTile = (product, className) => {
  let size = calculateSize(product.face, {
    font: 'Roboto',
    fontSize: `${product.size}px`
  });
  let colSize = Math.ceil(size.width / GRID_LIST_CELL);
  return (
    <GridListTile key={product.id} cols={colSize} style={{alignItems:'center'}}>
        <Typography type="body1" color="inherit" className={className} style={{fontSize: `${product.size}px`}}>
          {product.face}
        </Typography>
      <GridListTileBar
        title={_.formatPriceToDollars(product.price)}
        subtitle={<span>{_.formatDateToRelative(product.date)}</span>}
      />
    </GridListTile>
  );
}

const productGridListTileWithAds = (product, className) => {
  let tile = productGridListTile(product, className);
  let ads = (
    <GridListTile key={'ads_'+ product.id} cols={GRID_LIST_COL}>
      <div style={{textAlign:'center'}}><Ads /></div>
    </GridListTile>
  );
  return [tile, ads];
}

export default withStyles(styles)(ProductGridList);
