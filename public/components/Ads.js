import React from 'react';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  img: {
    alignSelf: 'center',
    justifyContent: 'space-around',
    alignItems:'center',
    height:200
  }
});

class Ads extends React.Component {
  render() {
    const { classes } = this.props;
    let randomNumber = Math.floor(Math.random()*1000);
    let sourceUrl = (this.props.source) ? this.props.source : `http://localhost:3000/ads/?r=${randomNumber}`;

    return (
      <img
        alt={randomNumber}
        className={classes.img}
        src={sourceUrl}
      />
    );
  }
}

export default withStyles(styles)(Ads);
