import React from 'react';
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { createCampaign, createCharacter } from '../../actions';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

class CampaignForm extends React.Component{

  state = {
    title: '',
    description: '',
    sessionLocation: ''
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

    makeCampaign = () => {
      const { title } = this.state
      const { description } = this.state

      const dm_id = this.props.currentUser.id
      const game_id = 1

      const campaign = {
        title,
        description,
        dm_id,
        game_id,
      }


      const currentUser = this.props.currentUser.id
      const pushURL = `/campaign/`
      const history = this.props.history

      console.log('campaign object', campaign, history, pushURL, currentUser)
      // console.log('character object', character)
      // this.props.createCharacter(character)
      this.props.createCampaign(campaign, history, pushURL, currentUser)
      this.props.handleClose()
      // // return <Redirect to={`/campaign/${this.props.currentCampaign.id}/${campaign_id}/${newCampaign.id}`} />
      // this.props.history.push(`/campaign/${this.props.currentCampaign.id}/${newCampaign.id}`)
    }

  render () {
    // onClose={this.createCampaign}

    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.props.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">New Campaign</DialogTitle>
          <DialogContent>
            <form>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              name='title'
              label="Title"
              onChange={this.handleChange}
              value={this.state.title}
              fullWidth
            />
            <TextField
              multiline
              margin="dense"
              id="description"
              name='description'
              label="Description"
              onChange={this.handleChange}
              value={this.state.description}
              fullWidth
            />
            {/* <FormControl>
              EVENTUALLY, this can be resurrected as a game selection dropdown.
              <InputLabel>{this.state.location.title}</InputLabel>
              <InputLabel htmlFor="sessionLocation">Location</InputLabel>

               <Select
                value={this.state.sessionLocation}
                onChange={this.handleChange}
                input={<Input name='sessionLocation' id="sessionLocation" />}
              >
                {this.props.locations.map(location => {
                  const name = location.title
                  return <MenuItem value={location.id}>{name}</MenuItem>
                })}

              </Select>
              <FormHelperText>Some super important helper text that apparently dictates the length of the field</FormHelperText>
            </FormControl> */}
          </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.makeCampaign} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    currentUser: state.initReducer.currentUser,
    campaign: state.campaignReducer.currentCampaign,
  }
}

export default withRouter(connect(mapStateToProps, { createCampaign, createCharacter })(CampaignForm))
