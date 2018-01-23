import React from 'react';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';


const styles = theme => ({
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
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
      sortBy: 1
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, index, value) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render () {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return <AppBar>
      <Toolbar>
        <Typography type="title" color="inherit" className={classes.flex}>
          Products Grid
        </Typography>
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="age-simple">Sort by</InputLabel>
            <Select
            value={this.state.sortBy}
            onChange={this.handleChange}
            inputProps={{
              name: 'sortBy',
              id: 'sortBy-simple',
            }}
          >
            <MenuItem value={1}>Size</MenuItem>
            <MenuItem value={2}>Price</MenuItem>
            <MenuItem value={3}>ID</MenuItem>
          </Select>
          </FormControl>
        </div>

      </Toolbar>
    </AppBar>
  }
}

export default withStyles(styles)(Header);
