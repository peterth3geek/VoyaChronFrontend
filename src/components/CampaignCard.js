import React from 'react';
import { withRouter } from 'react-router-dom'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = {
  card: {
    margin:'2vw',
    minWidth: 400,
    maxWidth: '30vw',
    height: 325,
    backgroundColor: '#616161',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
    overflow: 'hidden',
    align: 'center',
    height: 145,
  },
};

class CampaignCard extends React.Component{


  campaignClick = (e) => {
    const { campaign } = this.props;
    this.props.history.push(`/campaign/${campaign.id}`)
  }

  renderCard = () => {
    const { classes } = this.props;
    const { campaign } = this.props;
  return  (
    <div>
      <Card className={classes.card}>
      <CardActionArea onClick={this.campaignClick}>
        <CardHeader title={campaign.title} subheader='Dungeons and Dragons 5e (Non-Fetched)' />
          <CardContent >
            <Typography className={classes.pos} component="p">
              {campaign.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Typography className={classes.pos}>
            <Button size='small' color='secondary'>
              GM: @{campaign.dungeonmaster}
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



CampaignCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(CampaignCard));
