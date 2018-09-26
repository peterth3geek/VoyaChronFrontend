import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import compose from 'recompose/compose'

import { withStyles } from '@material-ui/core/styles';
import { withTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import { createEvent } from '../actions'


import EventCard from './EventCard'

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '93.3vh',
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
  textField: {
  marginLeft: theme.spacing.unit,
  marginRight: theme.spacing.unit,
},
});

class EventSplash extends React.Component{

  state = {
    description: ''
  }

  eventEnter = (e) => {
    // e.preventDefault()
    const eventKey = e.key
    const formData = this.state.description

    if(eventKey === 'Enter'){
      e.preventDefault()
      const event ={
        character_id: 1,
        story_module_id: 1,
        description: formData
      }
      this.props.createEvent(event)
      this.setState({
        description: ''
      })
    } else {
      // console.log(e.key)
    }


  }

  eventText = (e) => {
    e.preventDefault()

    const description = e.target.value

    this.setState({description: description})
  }

  submitEvent = (e) => {
    // const formID = e.target.id
    const formData = e.target.textData.value
    const characterID = e.target.dataset.tag
    e.preventDefault()

    console.log('splash', formData)

  if(formData !== '') {
      const event ={
        character_id: characterID,
        story_module_id: 1,
        description: formData
      }

      this.props.createEvent(event)
    }

  }

  mapChapters = () => {
    const { chapters } = this.props.campaign
    return chapters.map(chapter => {
      return(
        <div key={chapter.id}>
          {chapter.title}
        </div>
      )
    })
  }

  mapEvents = () => {
    // const { characters } = this.props.campaign

    const newArr = this.props.eventArray.sort((a, b) =>{
      return b.id - a.id
    })

    return newArr.map(event =>{
      // console.log(event)
    return  <EventCard key={event.id} character={event.character} event={event}/>
    })
  }

  render () {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.cardDiv}>
            {this.mapEvents()}
        </div>
        <div>
          <TextField
            value={this.state.description}
            placeholder='Enter your events here...'
            label='Event Text'
            className={classes.textField}
            onKeyDown={this.eventEnter}
            onChange={this.eventText}
            style={{width: 400}}
            multiline
            InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button color='primary'>Create</Button>
            </InputAdornment>
          ),
        }}
            margin='dense'
            width='50vw'/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log('in map state to props', state)
  return{
    currentUser: state.initReducer.currentUser,
    eventTheme: state.campaignReducer.eventTheme,
    characterTheme: state.campaignReducer.eventTheme,
    eventArray: state.campaignReducer.campaignEvents
  }
}

export default withRouter(compose(
  connect(mapStateToProps, { createEvent }),
  withTheme(), withStyles(styles))(EventSplash))
