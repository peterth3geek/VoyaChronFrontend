import React from 'react';

import { connect } from 'react-redux'
import compose from 'recompose/compose'

import { withStyles } from '@material-ui/core/styles';
import { withTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import { createEvent } from '../actions'

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
  textField: {
  marginLeft: theme.spacing.unit,
  marginRight: theme.spacing.unit,
},
});

class EventTextField extends React.Component{

  state = {
    description: ''
  }

  eventText = (e) => {
    e.preventDefault()

    const description = e.target.value

    this.setState({description: description})
  }

  submitEvent = (e) => {
    // const formID = e.target.id
    const formData = this.state.description
    const characterID = e.target.dataset.tag
    const session = this.props.sessionID
    // e.preventDefault()

  if(formData !== '') {
      const event ={
        character_id: characterID,
        story_module_id: session,
        description: formData
      }

      this.props.createEvent(event)
      this.setState({description: ''})
    }

  }


  eventEnter = (e) => {
      const eventKey = e.key
      const formData = this.state.description
      let { character } = this.props

      if (character == undefined){
        character = {id: 1}
      }

      if(eventKey === 'Enter'){
        e.preventDefault()
        const event ={
          character_id: character.id,
          story_module_id: this.props.sessionID,
          description: formData
        }
        this.props.createEvent(event)
        this.setState({
          description: ''
        })
      }
    }

  render () {
    return (
      <div>
        <TextField
          value={this.state.description}
          placeholder='Enter your events here...'
          label='Event Text'
          // className={classes.textField}
          onKeyDown={this.eventEnter}
          onChange={this.eventText}
          style={{minWidth: 400,
              maxWidth: '30vw',}}
          multiline
          InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Button color='primary' onClick={this.submitEvent}>Create</Button>
          </InputAdornment>
        ),
      }}
          margin='dense'
          width='50vw'/>
      </div>
    )
  }
}

export default compose(connect(null, { createEvent }),
withStyles(styles))(EventTextField)
