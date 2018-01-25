import AppBar from 'material-ui/AppBar';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import React from 'react';
import Select from 'material-ui/Select';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  title: {
    flex:1,
    marginRight: 100,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  text: {
    flex:1,
    textAlign: 'left',
    color: '#1A237E'
  },
  subtitle: {
    marginRight: 30
  }
});

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortBy: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, index, value) {
    this.setState({ [event.target.name]: event.target.value });
    this.props.sortProductsBy(event.target.value);
  }

  render () {
    const { classes } = this.props;

    return (
      <AppBar>
        <Toolbar>
          <Typography type="headline" color="inherit" className={classes.title}>Products Grid</Typography>
          <Typography type="caption" color="inherit" className={classes.subtitle}>
            <em>
              Here you are sure to find a bargain on some of the finest ascii available to purchase.<br />
              Be sure to peruse our selection of ascii faces in an exciting range of sizes and prices.
            </em>
          </Typography>
          <div>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="age-simple">Sort by</InputLabel>
              <Select value={this.state.sortBy}
                onChange={this.handleChange}
                style={{textAlign:'center'}}
                inputProps={{
                  name: 'sortBy',
                  id: 'sortBy-simple',
                }}>
                <MenuItem value={''}><em>None</em></MenuItem>
                <MenuItem value={'size'}>Size</MenuItem>
                <MenuItem value={'price'}>Price</MenuItem>
                <MenuItem value={'id'}>ID</MenuItem>
              </Select>
            </FormControl>
          </div>
        </Toolbar>
      </AppBar>
    )
  }
}

export default withStyles(styles)(Header);
