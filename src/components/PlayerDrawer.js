import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import compose from 'recompose/compose'

import { withTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';

import { createEvent } from '../actions'

import PlayerDrawerCard from './PlayerDrawerCard'

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '93.3vh',
    minWidth: '30vw',
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
    width: '30vw',
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

    const { campaign } = this.props
    if(campaign.characters.length > 0){
      console.log('hits character map')
      return campaign.characters.map(character => {
        // const { classes } = this.props;
        return  (
          <PlayerDrawerCard character={character}/>
        )
      })
    } else {
      console.log('hits button render')
      return <Button variant='outlined' color='primary'>Add Characters</Button>
    }

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
    characters: state.initReducer.userCharacters,
    campaign: state.campaignReducer.currentCampaign,
  }
}

export default withRouter(compose(
  connect(mapStateToProps, { createEvent }),
  withStyles(styles),
  withTheme())(PlayerDrawer));
