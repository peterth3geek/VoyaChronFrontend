import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


const styles = {
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  }
};

const EventCard = (props) => {
    const flexContainer = {
      display: 'flex',
      padding: '0.5vw',
      width: 375
    }
    return (
        <ListItem button style={flexContainer}>
          <ListItemText
            primary={props.character.name}
            secondary={props.event.description}
          />
        </ListItem>
    )
}

EventCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EventCard);
