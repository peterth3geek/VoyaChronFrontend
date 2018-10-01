import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import compose from 'recompose/compose'

import { withTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';

import { createEvent } from '../actions'

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';

import PlayerDrawerCard from './PlayerDrawerCard'

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '93.3vh',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',

  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  // 'appBar-right': {
  //   marginRight: '35vw',
  // },
  drawerPaper: {
    position: 'relative',
    height: '93.3vh',
    overflow: 'scroll',
  },
  toolbar: theme.mixins.toolbar,
});

class PlayerDrawer extends React.Component {

  state = {}

  handleEnter = (e) => {
    const eventKey = e.key
    const formData = this.state

    if(eventKey === 'Enter'){
      e.preventDefault()

      console.log('Enter', e.target, formData)
      const event ={
        character_id: 1,
        story_module_id: 1,
        description: formData
      }
      this.props.createEvent(event)
      this.setState({
        description: ''
      })
    }
  }

  eventText = (e) => {
    e.preventDefault()
    const textTag = e.target.id
    const textValue = e.target.value
    this.setState({
      [textTag]: textValue
    })
  }

  submitEvent = (e) => {
    e.preventDefault()
    // console.log('e.target =', e.target)
    const formID = e.target.id
    const formData = e.target.textData.value
    // const characterID = formID.split('-').pop()
    const characterID = e.target.dataset.tag
    // console.log('characterID = ', characterID)

    // console.log('e.target.dataset', e.target.dataset.tag)
if(formData !== '') {
    const event ={
      character_id: characterID,
      story_module_id: 1,
      description: formData
    }

    this.props.createEvent(event)
    this.setState({[formID]: ''})
    }
  }

  mapCharacters = () => {

    const campaign = this.props.campaign

    return campaign.characters.map(character => {
      // const { classes } = this.props;
      return  (
        <PlayerDrawerCard character={character}/>
      )
    })
  }

  render() {
    const { classes } = this.props;
    // console.log(this.state)
    return (
      <div className={classes.root}>
        <Drawer
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
            {this.mapCharacters()}
        </Drawer>
      </div>
    );
  }
}

PlayerDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  console.log('in map state to props', state)
  return{
    currentUser: state.initReducer.currentUser,
    currentCampaign: state.campaignReducer.currentCampaign,
  }
}

export default withRouter(compose(
  connect(mapStateToProps, { createEvent }),
  withStyles(styles),
  withTheme())(PlayerDrawer));
