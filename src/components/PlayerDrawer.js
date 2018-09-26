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
      // const event ={
      //   character_id: 1,
      //   story_module_id: 1,
      //   description: formData
      // }
      // this.props.createEvent(event)
      // this.setState({
      //   description: ''
      // })
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
    const formID = e.target.id
    const formData = e.target.textData.value
    const characterID = e.target.dataSet.tag
    e.preventDefault()

    console.log(e.target.dataset)
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

    const flexContainer = {
      display: 'flex',
      padding: '0.5vw',
      width: '30vw',
      height: '25vh',
      flexDirection: 'column',
    }

    return campaign.characters.map(character => {
      const { classes } = this.props;

      return  (
        <div id={`character-${character.id}`} key={character.name} style={flexContainer}>
        <Card style={{backgroundColor: '#616161', height: 200}}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary">
              <Button size='small'>{character.name}</Button>
            </Typography>
          </CardContent>

          <CardActions>
            <form id={`character-event-${character.id}`} data-tag={character.id} onSubmit={this.submitEvent}>
              <TextField
                style={{width: '25vw'}}
                onKeyPress={this.handleEnter}
                label={`${character.name}'s Event`}
                placeholder={`What did ${character.name} do?`}
                value={this.state[`character-event-${character.id}`]}
                id={`character-event-${character.id}`}
                name={'textData'}
                multiline
                margin='dense'
                width='15vw'
                onChange={this.eventText}/>
              <Button style={{width: '25vw'}} type='submit' size='small' color='primary'>Submit</Button>
            </form>
          </CardActions>
        </Card>
      </div>
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
    currentCampaign: state.campaignReducer.currentCampaign
  }
}

export default withRouter(compose(
  connect(mapStateToProps, { createEvent }),
  withStyles(styles),
  withTheme())(PlayerDrawer));
