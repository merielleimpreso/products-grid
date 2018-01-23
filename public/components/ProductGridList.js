import React from 'react';
import calculateSize from 'calculate-size';

import { withStyles } from 'material-ui/styles';
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import InfoIcon from 'material-ui-icons/Info';
import Typography from 'material-ui/Typography';

const GRID_LIST_WIDTH = 1000;
const GRID_LIST_COL = 8;
const GRID_LIST_CELL = 1000 / 8;

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: GRID_LIST_WIDTH,
  },
});

class ProductGridList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    }
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

  render() {
    const { classes } = this.props;

    return <div className={classes.root}>
      <GridList cellHeight={200} cols={GRID_LIST_COL} className={classes.gridList}>
      {
        this.state.products.map(tile => {

          const size = calculateSize(tile.face, {
           font: 'Roboto',
           fontSize: `${tile.size}px`
         });

         let colSize = Math.ceil(size.width / GRID_LIST_CELL)

          return <GridListTile key={tile.id} cols={colSize}>

          <GridListTileBar
            title={tile.price}
            subtitle={<span>{tile.date}</span>}
          />
            <p style={{fontSize: `${tile.size}px`, textAlign:'center'}}>{tile.face}</p>
          </GridListTile>
        })
      }
      </GridList>
    </div>
  }

}

export default withStyles(styles)(ProductGridList);
