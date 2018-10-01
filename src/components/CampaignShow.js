import React from 'react';
import { connect } from 'react-redux'
import { withRouter, Switch, Route, Redirect } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles';

import { loadCampaign } from '../actions'

import compose from 'recompose/compose'
import { withTheme } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import EventSplash from './EventSplash'
import CampaignSplash from './CampaignSplash'
import ChapterSplash from './ChapterSplash'
import PlayerDrawer from './PlayerDrawer'

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '93.3vh',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  campaignTitle: {
    color: 'white'
  },
})


class CampaignShow extends React.Component{

  state = {
    activeStep: ''
  }

  renderPage = () => {

    const campaign = this.props.currentCampaign

    if(this.props.loading){
      return 'LOADING... CAMPAIGN'
    } else {
      return (
        <div className={this.props.classes.root}>
          <div>
            <Switch>
              <Route exact path='/campaign/:campaign' render={() => <CampaignSplash campaign={campaign}/>} />
              <Route exact path='/campaign/:campaign/:chapter' render={() => <ChapterSplash chapter={{story_modules: []}} campaign={campaign} />}/>
              <Route exact path='/campaign/:campaign/:chapter/:session' render={() => <EventSplash campaign={campaign}/>} />
            </Switch>
          </div>
          <div>
              <PlayerDrawer campaign={campaign}/>
          </div>
        </div>
      )
    }
  }

  componentDidMount(){
    // console.log('did mount', this.props.match.params.slug)
    const campaignID = this.props.match.params.slug
    this.props.loadCampaign(campaignID)
  }

  render () {

    return (
      <div>
          {this.renderPage()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  // console.log('in map state to props', state)
  return{
    currentUser: state.initReducer.currentUser,
    currentCampaign: state.campaignReducer.currentCampaign
  }
}

export default withRouter(compose(
  connect(mapStateToProps, { loadCampaign }),
  withTheme(), withStyles(styles)
)(CampaignShow))
