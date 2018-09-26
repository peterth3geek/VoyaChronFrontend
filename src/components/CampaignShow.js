import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles';

import { loadCampaign } from '../actions'

import compose from 'recompose/compose'
import { withTheme } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

import EventSplash from './EventSplash'
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
  }
})


class CampaignShow extends React.Component{

  renderPage = () => {
    if(this.props.loading){
      return 'LOADING... CAMPAIGN'
    } else {
      return (
        <div className={this.props.classes.root}>
          <div flexDirection='column'>
            <Typography align='center'>
              <h1 className={this.props.classes.campaignTitle}>{this.props.currentCampaign.title}</h1>
            </Typography>

            <EventSplash campaign={this.props.currentCampaign}/>
          </div>
          <div>
              <PlayerDrawer campaign={this.props.currentCampaign}/>
          </div>
        </div>
      )
    }
  }

  componentDidMount(){
    console.log('did mount')
    this.props.loadCampaign()
  }

  render () {

    return (
      <div flexDirection='column'>
          {this.renderPage()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('in map state to props', state)
  return{
    currentUser: state.initReducer.currentUser,
    currentCampaign: state.campaignReducer.currentCampaign
  }
}

export default withRouter(compose(
  connect(mapStateToProps, { loadCampaign }),
  withTheme(), withStyles(styles)
)(CampaignShow))
