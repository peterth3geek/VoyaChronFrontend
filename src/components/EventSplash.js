import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import compose from 'recompose/compose'

import { withStyles } from '@material-ui/core/styles';
import { withTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { createEvent } from '../actions'

import EventTextField from './EventTextField'
import EventCard from './EventCard'

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '78vh',
    width: '70vw',
    zIndex: 1,
    overflow: 'auto',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  cardDiv: {
    height: '90vh',
    overflow: 'auto',
    // position: 'fixed',
    // bottom: 0
  },
});

class EventSplash extends React.Component{

  state = {
    description: '',
  }


  submitEvent = (e) => {
    // const formID = e.target.id
    const formData = e.target.textData.value
    const characterID = e.target.dataset.tag
    const { session } = this.props.match.params
    e.preventDefault()

  if(formData !== '') {
      const event ={
        character_id: characterID,
        story_module_id: session,
        description: formData
      }

      this.props.createEvent(event)
    }

  }

  mapEvents = () => {
    // const { characters } = this.props.campaign

    const newArr = this.props.eventArray.sort((a, b) =>{
      return b.id - a.id
    })

    return newArr.map(event =>{
      // console.log(event)
      const sessionID = this.props.match.params.session
      const { chapter } = this.props
      // console.log('eventMap', event.session, sessionID)
      if(event.session == undefined){

      } else if (event.session.id == sessionID){
        return  <EventCard key={event.id} session={event.session} chapter={chapter} character={event.character} event={event}/>
      }
    })
  }

  componentDidMount(){
    // console.log('did mount', this.props.match.params.slug)
    const sessionID = this.props.match.params.session
    // this.props.loadCampaign(campaignID)
  }

  render () {
    const { classes } = this.props;
    const { chapter } = this.props
    const { campaign } = this.props

    return (
      <div>
        <div style={{backgroundColor: '#424242', padding: '1vh'}}>
          <Typography align='center' variant='display2'>{this.props.campaign.title}</Typography>
          <Typography align='center' variant='display1'>{this.props.chapter.title}</Typography>
          <Typography align='center' paragraph>
            {this.props.chapter.description}
          </Typography>
        </div>
        <div  className={classes.root}>
        <div className={classes.cardDiv}>
            {this.mapEvents()}
        </div>
        <div>
          <EventTextField sessionID={this.props.match.params.session}/>
        </div>
      </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {

  return{
    currentUser: state.initReducer.currentUser,
    eventTheme: state.campaignReducer.eventTheme,
    characterTheme: state.campaignReducer.eventTheme,
    eventArray: state.campaignReducer.campaignEvents,
    chapter: state.campaignReducer.currentChapter
  }
}

export default withRouter(compose(
  connect(mapStateToProps, { createEvent }),
  withTheme(),
  withStyles(styles))(EventSplash))
