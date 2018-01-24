import React from 'react';
import { CircularProgress } from 'material-ui/Progress';
import { GridListTile } from 'material-ui/GridList';
import Typography from 'material-ui/Typography';

class Footer extends React.Component {
  render() {
    return (this.props.hasMoreProducts)
      ? <CircularProgress style={{alignSelf:'center'}} />
      : <Typography type="title" color="inherit">{'~ end of catalogue ~'}</Typography>;
  }
}

export default Footer;
