import React, { Component } from 'react'
// import PropTypes from 'prop-types';

import { connect } from 'react-redux'
import { loadUser } from './actions'

import { withStyles } from '@material-ui/core/styles';

import {Route, Switch, Redirect, withRouter} from 'react-router-dom'

import Landing from './components/landing'
import CampaignShow from './components/CampaignShow'
import NavBar from './components/NavBar'
import './App.css';
import compose from 'recompose/compose'
import { withTheme } from '@material-ui/core/styles';

import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

class App extends Component {

  componentDidMount() {
    this.props.loadUser()
  }

  render() {
    const { classes } = this.props
    return (
      <div>
        <NavBar theme={this.props.theme} />
        <div>
          {
            this.props.loading ?
            <div style={{position: 'absolute', top: '50%', left: '50%', transform: "translate('-50%', '-50%')"}}>
              <CircularProgress className={classes.progress} variant='indeterminate' size={100} color='secondary' />
            </div>
            :
            <Switch>
              <Route exact path='/' render={() => <Redirect to='/home' /> } />
              <Route exact path='/home' render={() => <Landing/> }/>
              <Route path='/campaign/:slug' render={(props) => <CampaignShow {...props} />}/>
              <Route render={() => <Redirect to='/home' />}/>
            </Switch>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.initReducer.loading,
    currentUser: state.currentUser
  }
}

export default withRouter(compose(
  connect(mapStateToProps, { loadUser }),
  withStyles(styles),
  withTheme()
)(App));
