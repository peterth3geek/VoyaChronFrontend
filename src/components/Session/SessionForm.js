import React from 'react';
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'

// import compose from 'recompose/compose'

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { createSession } from '../../actions';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

class SessionForm extends React.Component{

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

    makeSession = () => {
      const { title } = this.state
      const { description } = this.state
      const location_id = this.state.sessionLocation
      const chapter_id = this.props.currentChapter.id

      const campaign = this.props
      const chapter = this.props

      const session = {
        title,
        description,
        location_id,
        chapter_id
      }
      console.log('session object', session)

      const history = this.props.history
      const url = `/campaign/${this.props.currentCampaign.id}/${chapter_id}/`

      this.props.createSession(session, history, url)
      this.props.handleClose()
      const newSession = this.props.session
      console.log('newSession', newSession)
      //
      // // return <Redirect to={`/campaign/${this.props.currentCampaign.id}/${chapter_id}/${newSession.id}`} />
      // this.props.history.push(`/campaign/${this.props.currentCampaign.id}/${chapter_id}/${newSession.id}`)
    }

  render () {
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.props.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">New Session</DialogTitle>
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
            <FormControl>
              {/* <InputLabel>{this.state.location.title}</InputLabel> */}
              <InputLabel htmlFor="sessionLocation">Location</InputLabel>

              <Select
                value={this.state.sessionLocation}
                onChange={this.handleChange}
                input={<Input name='sessionLocation' id="sessionLocation" />}
              >
                {this.props.locations.map(location => {
                  const name = location.title
                  return <MenuItem key={location.title} value={location.id}>{name}</MenuItem>
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
            <Button onClick={this.makeSession} color="primary">
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
    currentChapter: state.campaignReducer.currentChapter,
    currentCampaign: state.campaignReducer.currentCampaign,
    locations: state.campaignReducer.locations,
    session: state.campaignReducer.currentSession
  }
}

export default withRouter(connect(mapStateToProps, { createSession })(SessionForm))
