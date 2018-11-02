import React from 'react';
import { connect } from 'react-redux'
import compose from 'recompose/compose'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import EventCard from './EventCard'

import Typography from '@material-ui/core/Typography';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft: '2vw',
    marginRight: '2vw',
    overflow: 'scroll',
  },
  headline: {
    margin: '1vw',
  }
};

class EventsContainer extends React.Component{
  state = {
    loading: true
  }

  mountEvents = () => {
    if(this.props.characters.length > 0){
      return  this.props.characters.map(character => {
        if(character.events.length > 0){
          return character.events.map(event => {
          // return  <EventListItem key={event.id} character={character} event={event}/>
          return  <EventCard key={event.id} session={event.session} character={character} event={event}/>
      })
    }
  })
    } else {
      return <ListItem type='Event'/>
    }
  }

  componentDidMount(){
    this.setState({loading: false})
  }

  render () {
    const { classes } = this.props;
    const flexContainer = {
      display: 'flex',
      flexDirection: 'row',
      padding: '0.5vw'
    }

    return (
      <div>
        <div className={classes.headline}>
          <Typography align='center' variant='display1'>
            Events
          </Typography>
        </div>
      <div className={classes.root}>
        <List style={flexContainer}>
          {this.mountEvents()}
        </List>
      </div>
    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    characters: state.initReducer.currentUser.characters,
  }
}

EventsContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default compose(withStyles(styles), connect(mapStateToProps))(EventsContainer)
