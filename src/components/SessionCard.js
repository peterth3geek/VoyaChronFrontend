import React from 'react';
import { withRouter } from 'react-router-dom'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Collapse from '@material-ui/core/Collapse';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = {
  card: {
    margin:'2vw',
    width: 400,
    height: 510,
    backgroundColor: '#616161',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
    overflow: 'scroll',
    align: 'center',
    height: 125,
  },
  pos2: {
    marginBottom: 12,
    overflow: 'scroll',
    align: 'center',
    height: 175,
  },
};

class SessionCard extends React.Component{

  state ={
    expanded: false
  }

  sessionClick = (e) => {
    const { session } = this.props;
    const { chapter } = this.props
    const { campaign } = this.props
    this.props.history.push(`/campaign/${campaign.id}/${chapter.id}/${session.id}`)
  }

  renderCard = () => {
    const { classes } = this.props;
    const { session } = this.props;
  return  (
    <div>
      <Card className={classes.card}>
        <CardActionArea onClick={this.sessionClick}>
        <CardHeader title={session.title} subheader='Dungeons and Dragons 5e (Non-Fetched)' />
          <CardContent >
            <Typography className={classes.pos} component="p">
              {session.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardContent>
          <Typography variant='caption'>
            Location:
          </Typography>
          <Typography variant='headline'>
            {session.location.title}
          </Typography>
        </CardContent>
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



SessionCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(SessionCard));