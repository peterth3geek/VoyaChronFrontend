import React from 'react';

import { connect } from 'react-redux'
import compose from 'recompose/compose'

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';

import { createEvent } from '../../actions'

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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
    description: '',
    character: this.props.campaign.dungeonmaster.id,
  }

  eventText = (e) => {
    e.preventDefault()

    const description = e.target.value

    this.setState({description: description})
  }

  handleChange = (e) => {
    const keyType = e.target.name
    const { value } = e.target
    this.setState(prevState =>(
      {...prevState,
      [`${keyType}`]: value
    }))
  }

  submitEvent = (e) => {
    // const formID = e.target.id
    const { description } = this.state
    const character_id = this.state.character
    const session = this.props.sessionID
    // e.preventDefault()

  if(character_id !== '' || description !== '') {
      const event ={
        character_id,
        story_module_id: session,
        description
      }
      // console.log('submitEvent', event)
      this.props.createEvent(event)
      this.setState(prevState => ({...prevState, description: ''}))
    }

  }


  eventEnter = (e) => {
    const eventKey = e.key
    const description = this.state.description
    const character_id = this.state.character

    if(eventKey === 'Enter'){
      e.preventDefault()
      // console.log(this.state.character)

      if(description === "" || this.state.character === null){
        // console.log(`BAD REQUEST! BAD`)
      } else {
        const event ={
          character_id,
          story_module_id: this.props.sessionID.id,
          description,
        }
        // console.log('eventEnter', event)
        this.props.createEvent(event)
        this.setState(prevState => ({
          ...prevState,
          description: ''
        }))
      }
    }
  }

    componentDidMount(){
      // const characters = this.props.campaign.characters.filter(character => {
      //   return character.campaign.id === this.props.campaign.id
      // })
    }

  render () {

    const characters = this.props.campaign.characters.filter(character => {
      // debugger
      return character.campaign.id === this.props.campaign.id
    })
    // console.log('state', this.state, 'dm', this.props.campaign.characters.filter(character => {
      // return character.name === 'Dungeonmaster'
    // }))
    return (
      <div>
        <TextField
          value={this.state.description}
          placeholder='Enter your events here...'
          label='Event Text'
          name='description'
          // className={classes.textField}
          onKeyDown={this.eventEnter}
          onChange={this.handleChange}
          style={{maxWidth: 600,
              minWidth: '40vw',}}
          multiline
          InputProps={{
        endAdornment: (
          <InputAdornment position="end">
          <FormControl >
            <InputLabel shrink htmlFor="character">Event As</InputLabel>
            <Select
              style={{width: '12vw'}}
              value={this.state.character}
              onChange={this.handleChange}
              input={<Input name='character' id="character" />}
              // defaultValue={this.props.campaign.dungeonmaster.id}
            >
              {characters.map((character, index) => {
                const name = character.name
                return <MenuItem
                  key={character.name}
                  value={character.id}>
                  {name}
                </MenuItem>
              })}
            </Select>
          </FormControl>
            <Button variant='outlined' color='primary' onClick={this.submitEvent}>Create</Button>
          </InputAdornment>
        ),
      }}
          margin='dense'
          width='50vw'/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    characters: state.initReducer.userCharacters,
    campaign: state.campaignReducer.currentCampaign
  }
}

export default compose(connect(mapStateToProps, { createEvent }),
withStyles(styles))(EventTextField)
