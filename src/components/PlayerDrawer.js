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
import CharacterForm from './CharacterForm'


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
  drawerPaper: {
    position: 'relative',
    height: '93.3vh',
    width: '30vw',
    overflow: 'scroll',
  },
  toolbar: theme.mixins.toolbar,
});

class PlayerDrawer extends React.Component {

  state = {
    setOpen: false,
  }

  handleEnter = (e) => {
    const eventKey = e.key
    const formData = this.state

    if(eventKey === 'Enter'){
      e.preventDefault()
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

    const formID = e.target.id
    const formData = e.target.textData.value
    const characterID = e.target.dataset.tag

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
      return campaign.characters.map(character => {
        return  (
          <PlayerDrawerCard character={character}/>
        )
      })
    } else {
    }
  }


  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <CharacterForm open={this.state.setOpen} handleClose={() => this.setState({setOpen: false})}/>

          <Drawer
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
          {this.props.campaign.characters.length >= 6 ?
            ''
            :
            <Button variant='outlined' color='primary' onClick={() => this.setState({setOpen: true})} >Add Characters</Button>
          }
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
