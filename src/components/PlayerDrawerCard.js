import React from 'react';
import { connect } from 'react-redux'

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import { createEvent } from '../actions'

import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';


class PlayerDrawerCard extends React.Component{

  state = {
    description: '',
  }

  eventText = (e) => {
    const description = e.target.value
    this.setState({ description })
  }

  handleEnter = (e) => {
    const eventKey = e.key
    const { description } = this.state
    const { character } = this.props
    const { session } = this.props
    // console.log(session)

    if(eventKey === 'Enter'){
      e.preventDefault()

      // console.log('Enter', e.target, formData)
      const event = {
        character_id: character.id,
        story_module_id: session.id,
        description: description
      }
      // console.log('The Event', event, 'session id', session)
      this.props.createEvent(event)
      this.setState({
        description: ''
      })
    }
  }

  render () {
    const { character } = this.props
    const flexContainer = {
      display: 'flex',
      padding: '0.5vw',
      width: '30vw',
      height: '25vh',
      marginTop: '1vh',
      flexDirection: 'column',
    }
    return (
      <div id={`character-${character.id}`} key={character.name} style={flexContainer}>
      <Card style={{backgroundColor: '#616161', height: 120}}>
        <CardActions disableActionSpacing>
          <form id={`character-event-${character.id}`} style={{padding: '0.5vw'}} data-tag={character.id} onSubmit={this.submitEvent}>
            <TextField
              style={{width: '26.5vw'}}
              onKeyPress={this.handleEnter}
              label={`${character.name}`}
              placeholder={`What did ${character.name} do?`}
              value={this.state.description}
              id={`character-event-${character.id}`}
              name='textData'
              multiline
              disabled={ !!this.props.session.id ?
                false
                :
                true
              }
              margin='dense'
              InputProps={{
            endAdornment: (
              <InputAdornment disableTypography position="end">
                <Typography>
                { !!this.props.session.id ?
                  <Button variant='outlined'>
                    Create
                  </Button>
                  :
                  ''}
                </Typography>
              </InputAdornment>
            ),
          }}
              onChange={this.eventText}/>
          </form>
        </CardActions>
      </Card>
    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    currentUser: state.initReducer.currentUser,
    chapter: state.campaignReducer.currentChapter,
    session: state.campaignReducer.currentSession
  }
}

export default connect(mapStateToProps, { createEvent })(PlayerDrawerCard)
