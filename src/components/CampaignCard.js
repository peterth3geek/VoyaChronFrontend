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
    minWidth: 350,
    maxWidth: 350
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

class CampaignCard extends React.Component{


  campaignClick = (e) => {
    const { campaign } = this.props;
    this.props.history.push(`/campaigns/${campaign.id}`)
  }

  renderCard = () => {
    const { classes } = this.props;
    const { campaign } = this.props;
  return  (
    <div>
      <Card className={classes.card}>
      <CardActionArea onClick={this.campaignClick}>
          <CardContent >
            <Typography className={classes.title} color="textSecondary">
              Dungeons and Dragons 5e (Non-Fetched)
            </Typography>
            <Typography variant="headline" component="h2">
              {campaign.title}
            </Typography>
            <Typography className={classes.pos} component="p">
              {campaign.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Typography className={classes.pos}>
            <Button size='small' color='secondary'>GM: @{campaign.dungeonmaster}</Button>
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
