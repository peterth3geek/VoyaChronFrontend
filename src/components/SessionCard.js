import React from 'react';
import { withRouter } from 'react-router-dom'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';

import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    margin:'2vw',
    minWidth: 370,
    maxWidth: '30vw',
    height: 510,
    backgroundColor: '#616161',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
    minWidth: 370,
    maxWidth: '30vw',
    overflow: 'scroll',
    align: 'center',
    height: 125,
  },
  pos2: {
    marginBottom: 12,
    minWidth: 370,
    maxWidth: '30vw',
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
        <CardActionArea onClick={this.sessionClick} style={{minWidth: 370, maxWidth: '30vw',}}>
        <CardHeader title={session.title} titleTypographyProps={{variant: 'display1', backgroundColor: 'primary', color: 'textPrimary'}} />
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
          <Typography variant='body1'>
            {session.location.description}
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
