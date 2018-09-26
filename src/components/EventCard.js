import React from 'react';
import { withRouter } from 'react-router-dom'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = {
  card: {
    marginLeft: '2vw',
    marginRight: '2vw',
    minWidth: 400,
    maxWidth: 400,
    // flexDirection: 'column',
    marginBottom: '2vh',
    marginTop: '2vh',
    backgroundColor: '#616161',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
    width: '100%'
  },
  pos: {
    marginBottom: 12,
  },
};

class EventCard extends React.Component{


  eventClick = (e) => {
    const { event } = this.props;
    this.props.history.push(`/events/${event.id}`)
  }

  renderCard = () => {
    const { classes } = this.props;
    const { character } = this.props;
    const { event } = this.props;
    console.log(character)
  return  (
    <div>
      <Card className={classes.card}>
      <CardActionArea onClick={this.eventClick}>
          <CardContent >
            <Typography className={classes.title} color="textSecondary">
              { !!character ?
                character.name
                :
                'GM'
              }
            </Typography>
            <Typography className={classes.pos} component="p">
              {event.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Typography className={classes.pos}>
            <Button size='small' color='secondary'>
              Player: @{character ? character.player.username : 'GM'}
            </Button>
          </Typography>
        </CardActions>
      </Card>
  </div>
  )
}

  render () {
    return (
      <div>
        {this.renderCard()}
      </div>
    )
  }
}



EventCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(EventCard));
