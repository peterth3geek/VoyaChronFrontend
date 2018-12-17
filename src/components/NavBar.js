import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import compose from 'recompose/compose'
// import MaterialBar from '../MaterialComponents/MaterialBar'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import CasinoIcon from '@material-ui/icons/Casino'


// import MenuItem from '@material-ui/core/MenuItem';
// import Menu from '@material-ui/core/Menu';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class NavBar extends React.Component{

  sendHome = () => {
    this.props.history.push(`/home`)
  }


  render () {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static" color='primary'>
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={this.sendHome}>
              <CasinoIcon fontSize='large'/>
            </IconButton>
            {/* <Button variant='contained' color='primary' onClick={this.sendHome}> */}
              <Typography variant="title" color="inherit" className={classes.grow}>
                VoyaChron
              </Typography>
            {/* </Button> */}
            <div>
              <Button onClick={this.sendHome}>
              @{this.props.currentUser.username}
            </Button>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  console.log(state.initReducer.currentUser)
  return {
    currentUser: state.initReducer.currentUser
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(compose(withStyles(styles), connect(mapStateToProps))(NavBar));
