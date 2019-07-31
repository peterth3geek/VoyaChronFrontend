import React from 'react';
import { connect } from 'react-redux'
import { withRouter, Switch, Route } from 'react-router-dom'

import { withStyles, withTheme } from '@material-ui/core/styles';

import compose from 'recompose/compose'

import { loadCampaign } from '../../actions'

import EventSplash from '../Event/EventSplash'
import CampaignSplash from '../Campaign/CampaignSplash'
import ChapterSplash from '../Chapter/ChapterSplash'
import PlayerDrawer from '../Player/PlayerDrawer'

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
              <Route exact path='/campaign/:campaign' render={() => <CampaignSplash />} />
              <Route exact path='/campaign/:campaign/:chapter' render={() => <ChapterSplash chapter={{story_modules: []}} campaign={campaign} />}/>
              <Route exact path='/campaign/:campaign/:chapter/:session' render={() => <EventSplash campaign={campaign}/>} />
            </Switch>
          </div>
          <div>
              <PlayerDrawer />
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
    loading: state.initReducer.loading,
    currentUser: state.initReducer.currentUser,
    currentCampaign: state.campaignReducer.currentCampaign
  }
}

export default withRouter(compose(
  connect(mapStateToProps, { loadCampaign }), withStyles(styles)
)(CampaignShow))
