import React from 'react';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

const styles = {
  root: {
    width: '100%',
  },
};

const header = () => (
  <AppBar>
    <Toolbar>
      <Typography type="title" color="inherit">
      Products Grid
      </Typography>
    </Toolbar>
  </AppBar>

  // <div>
  //   <h1>Products Grid</h1>
  //
  //   <p>Here you are sure to find a bargain on some of the finest ascii available to purchase. Be sure to peruse our selection of ascii faces in an exciting range of sizes and prices.</p>
  //   <p>But first, a word from our sponsors:</p>
  // </div>
)
export default header;
