import React from 'react';
import { connect } from 'react-redux'

import CampaignsContainer from './CampaignsContainer'
import CharactersContainer from './CharactersContainer'
import EventsContainer from './EventsContainer'

import compose from 'recompose/compose'
import { withTheme } from '@material-ui/core/styles';



class Landing extends React.Component{

  renderPage = () => {

      return (
        <div>
            <EventsContainer />
            <CampaignsContainer />
            <CharactersContainer />
        </div>
    )
    // }
  }

  componentDidMount(){
    this.setState({loading: false})
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
  return{
    currentUser: state.initReducer.currentUser,
    campaignTheme: state.campaignTheme
  }
}

export default compose(
  connect(mapStateToProps),
  withTheme()
)(Landing)
