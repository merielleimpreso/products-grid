import _ from 'underscore';
import Ads from './Ads';
import calculateSize from 'calculate-size';
import { CircularProgress } from 'material-ui/Progress';
import Footer from './Footer';
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import React from 'react';
import StarBorderIcon from 'material-ui-icons/StarBorder';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

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
  gridListTileAds: {
    textAlign:'center',
    backgroundColor:'#FFCCBC',
    height:'100hv',
  },
  icon: {
    color: 'white',
  },
  textCenter: {
    textAlign:'center',
  },
});

class ProductGridList extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <GridList cellheight={200} cols={GRID_LIST_COL} className={classes.gridList}>
          {
            this.props.products.map((product, index) => {
              return (product.hasOwnProperty('source'))
                ? productGridListTileWithAds(product, classes.gridListTile, classes.gridListTileAds)
                : productGridListTile(product, classes.gridListTile);
            })
          }
          <GridListTile key={'footer'} cols={GRID_LIST_COL} cellheight={80} className={classes.textCenter}>
            <Footer hasMoreProducts={this.props.hasMoreProducts}/>
          </GridListTile>
        </GridList>
      </div>
    );
  }
}

const productGridListTile = (product, className) => {
  // Compute for column size according to font and text
  let size = calculateSize(product.face, {
    font: 'Roboto',
    fontSize: `${product.size}px`
  });
  let colSize = Math.ceil(size.width / GRID_LIST_CELL);

  // Create title and subtitle for tile
  let title = <span>{_.formatPriceToDollars(product.price)} <span style={{float:'right'}}>{product.size}px</span></span>
  let subtitle = <span>{product.id} <span style={{float:'right'}}>{_.formatDateToRelative(product.date)}</span></span>

  return (
    <GridListTile key={product.id + Date.now()} cols={colSize} style={{alignItems:'center'}} title={product.id}>
      <Typography type="body1" color="inherit" className={className} style={{fontSize: `${product.size}px`}}>
        {product.face}
      </Typography>
      <GridListTileBar title={title} subtitle={subtitle}/>
    </GridListTile>
  );
}

const productGridListTileWithAds = (product, className, classNameAds) => {
  let tile = productGridListTile(product, className);
  let ads = (
    <GridListTile key={product.id} cols={GRID_LIST_COL} cellheight={200}>
      <div className={classNameAds}>
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
  return ads;
}

export default withStyles(styles)(ProductGridList);
