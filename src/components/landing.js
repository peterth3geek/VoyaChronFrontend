import React from 'react';
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'


import CampaignsContainer from './Campaign/CampaignsContainer'
import CharactersContainer from './Character/CharactersContainer'
import EventsContainer from './Event/EventsContainer'
// import FauxLogin from './FauxLogin'

import { setCampaign } from '../actions'

import compose from 'recompose/compose'
import { withTheme } from '@material-ui/core/styles';



class Landing extends React.Component{

  renderPage = () => {

      return (
        <div>
          <div style={{display: 'flex', flexDirection: 'row', align: 'center'}} >
            <CampaignsContainer />
            <CharactersContainer />
          </div>
          {/* <div>
            <EventsContainer />
          </div> */}
        </div>
    )
    // }
  }

  componentDidMount(){
    this.setState({loading: false})
    // this.props.setCampaign({characters: [], chapters: [], dungeonmaster: {username: null}})
  }

  render () {
    return (
      <div>
        <div>
          {this.renderPage()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  // console.log(state)
  return{
    currentUser: state.initReducer.currentUser,
    // campaignTheme: state.campaignTheme
  }
}

export default withRouter(compose(
  connect(mapStateToProps, { setCampaign }),
  withTheme()
)(Landing))
