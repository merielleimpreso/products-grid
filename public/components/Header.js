import React from 'react';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Select from 'material-ui/Select';

const styles = theme => ({
  flex: {
    flex: 1,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
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

    return <AppBar>
      <Toolbar>
        <Typography type="title" color="inherit" className={classes.flex}>
          Products Grid
        </Typography>
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="age-simple">Sort by</InputLabel>
            <Select
            color={'white'}
            value={this.state.sortBy}
            onChange={this.handleChange}
            inputProps={{
              name: 'sortBy',
              id: 'sortBy-simple',
            }}
          >
            <MenuItem value={''}><em>None</em></MenuItem>
            <MenuItem value={'size'}>Size</MenuItem>
            <MenuItem value={'price'}>Price</MenuItem>
            <MenuItem value={'id'}>ID</MenuItem>
          </Select>
          </FormControl>
        </div>

      </Toolbar>
    </AppBar>
  }
}

export default withStyles(styles)(Header);
