import React from 'react';
import { connect } from 'react-redux'
import compose from 'recompose/compose'
import { withRouter } from 'react-router-dom'

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { getUserByUsername } from '../actions'


import Button from '@material-ui/core/Button';


class FauxLogin extends React.Component{

  state = {
    username: ''
  }


  login = (e) =>{
     const user = {username: 'peterthegeek',
     about: 'thisis about',
     email: 'this@isemail.com',
     password_digest: 'thisis a digest of passwords'}

     const history = this.props.history

     history.push(`VOYACHRON`)

    this.props.getUserByUsername(user, history)
    console.log(history)
  }

  render () {
    return (
      <div>
        <Dialog
          open={true}
          onClose={this.createSession}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">VOYACHRON</DialogTitle>
          <DialogContent>
            <form>
            <TextField
              autoFocus
              margin="dense"
              id="username"
              name='username'
              label="Username"
              onChange={this.handleChange}
              value={this.state.title}
              fullWidth
            />
          </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.login} color='primary'>Lets Do This!</Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default withRouter(connect(null, { getUserByUsername })(FauxLogin))
