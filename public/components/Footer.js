import { CircularProgress } from 'material-ui/Progress';
import { GridListTile } from 'material-ui/GridList';
import React from 'react';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  progress: {
    alignSelf: 'center'
  },
  end: {
    color:'#002884'
  }
});

class Footer extends React.Component {
  render() {
    const { classes } = this.props;
    
    return (this.props.hasMoreProducts)
      ? <CircularProgress className={classes.progress} />
      : <Typography type="title" color="inherit" className={classes.end}>{'~ end of catalogue ~'}</Typography>;
  }
}

export default withStyles(styles)(Footer);
