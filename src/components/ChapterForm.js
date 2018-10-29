import React from 'react';
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { createChapter } from '../actions';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

class ChapterForm extends React.Component{

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

    makeChapter = () => {
      const { title } = this.state
      const { description } = this.state

      const campaign_id = this.props.campaign.id

      const chapter = {
        title,
        description,
        campaign_id,
      }

      const history = this.props.history
      const url = `/campaign/${campaign_id}/`
      console.log('chapter object', chapter)
      this.props.createChapter(chapter, history, url)
      this.props.handleClose()
      const newChapter = this.props.chapter
      console.log('newChapter', newChapter)
      //
      // // return <Redirect to={`/campaign/${this.props.currentCampaign.id}/${chapter_id}/${newChapter.id}`} />
      // this.props.history.push(`/campaign/${this.props.currentCampaign.id}/${newChapter.id}`)
    }

  render () {
    // onClose={this.createChapter}
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.props.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">New Chapter</DialogTitle>
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
              {/* <InputLabel htmlFor="sessionLocation">Location</InputLabel> */}

              {/* <Select
                value={this.state.sessionLocation}
                onChange={this.handleChange}
                input={<Input name='sessionLocation' id="sessionLocation" />}
              >
                {this.props.locations.map(location => {
                  const name = location.title
                  return <MenuItem value={location.id}>{name}</MenuItem>
                })}

              </Select> */}
              <FormHelperText>Some super important helper text that apparently dictates the length of the field</FormHelperText>
            </FormControl>
          </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.makeChapter} color="primary">
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
    chapter: state.campaignReducer.currentChapter,
    campaign: state.campaignReducer.currentCampaign,
    locations: state.campaignReducer.locations,
    session: state.campaignReducer.currentChapter
  }
}

export default withRouter(connect(mapStateToProps, { createChapter })(ChapterForm))
