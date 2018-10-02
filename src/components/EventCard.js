import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import compose from 'recompose/compose'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';

import { setChapter, loadChapter } from '../actions'

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = {
  card: {
    margin: '1vw',
    minWidth: 400,
    maxWidth: '30vw',
    height: 200,
    // align: 'center',
    // flexDirection: 'column',
    marginBottom: '2vh',
    marginTop: '2vh',
    backgroundColor: '#616161',
  },
  actionClass: {
    width: '100%',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
    width: '100%'
  },
  pos: {
    marginBottom: 12,
    height: 75,
    overflow: 'hidden',
    align: 'center'
  },
};

class EventCard extends React.Component{


  eventClick = () => {
    // const { event } = this.props;
    const { session } = this.props
    const chapter = this.props.session.chapter
    const campaign = chapter.campaign
    // console.log('Event Click', chapter)
    this.props.loadChapter(chapter.id)
    this.props.history.push(`/campaign/${campaign.id}/${chapter.id}/${session.id}`)
  }

  renderCard = () => {
    const { classes } = this.props;
    const { character } = this.props;
    const { event } = this.props;
    // console.log(character)
  return  (
    <div>
      <Card className={classes.card}>
      <CardActionArea className={classes.actionClass} onClick={this.eventClick}>
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


const mapStateToProps = (state) => {
  return{
    campaign: state.campaignReducer.currentCampaign
  }
}


EventCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(
  compose(withStyles(styles),
connect(mapStateToProps, { setChapter, loadChapter }))(EventCard));
