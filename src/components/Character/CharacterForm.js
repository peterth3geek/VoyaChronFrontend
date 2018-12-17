import React from 'react';
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import DialogTitle from '@material-ui/core/DialogTitle';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { createCharacter } from '../../actions';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

class CharacterForm extends React.Component{

  state = {
    name: '',
    biography: '',
    notes: '',
    npc: false,
    campaign_id: '',
  }

  handleChange = (e) => {
    const keyType = e.target.name
    const { value } = e.target
    // console.log('change event', e.target)

    this.setState(prevState =>(
      {...prevState,
      [`${keyType}`]: value
    }))
  }

    makeCharacter = () => {
      const { name, biography, campaign_id, npc, notes } = this.state

      const user_id = this.props.user.id

      const character = {
        name,
        biography,
        npc,
        user_id,
        campaign_id,
      }
      console.log('character object', character)

      const history = this.props.history
      const url = `/campaign/${campaign_id}`

      this.props.createCharacter(character, history, url)
      this.props.handleClose()
    }

  render () {
    // onClose={this.createCharacter}
    return (
      <div>
        <Dialog
          open={this.props.open}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">New Character</DialogTitle>
          <DialogContent>
            <form>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              name='name'
              label="Name"
              onChange={this.handleChange}
              value={this.state.name}
              fullWidth
            />
            <TextField
              multiline
              margin="dense"
              id="biography"
              name='biography'
              label="biography"
              onChange={this.handleChange}
              value={this.state.biography}
              fullWidth
            />
            <TextField
              multiline
              margin="dense"
              id="notes"
              name='notes'
              label="notes"
              onChange={this.handleChange}
              value={this.state.notes}
              fullWidth
            />
            <FormControl>
              <InputLabel htmlFor="campaign_id">Campaign</InputLabel>
              <Select
                value={this.state.campaign_id}
                onChange={this.handleChange}
                input={<Input name='campaign_id' id="campaign_id" />}
              >
                {this.props.user.campaigns.map(campaign => {
                  const name = campaign.title
                  return <MenuItem key={campaign.title} value={campaign.id}>{name}</MenuItem>
                })}

              </Select>
              <FormHelperText>Some super important helper text that apparently dictates the length of the field</FormHelperText>
            </FormControl>
          </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.makeCharacter} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return{
    user: state.initReducer.currentUser.user,
    campaign: state.campaignReducer.currentCampaign,
  }
}

export default withRouter(connect(mapStateToProps, { createCharacter })(CharacterForm))
