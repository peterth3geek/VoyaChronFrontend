import React from 'react';
import { connect } from 'react-redux'
import compose from 'recompose/compose'
import { withRouter } from 'react-router-dom'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { setCampaign, deleteCampaign } from '../actions'


import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'


const styles = {
  card: {
    margin:'2vw',
    minWidth: 370,
    maxWidth: '30vw',
    minHeight: 325,
    maxHeight: '30vh',
    backgroundColor: '#616161',
    // overflow: 'scroll',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
    overflow: 'scroll',
    align: 'center',
    minWidth: '370',
    maxWidth: '30vw',
    height: 150,
  },
};

class CampaignCard extends React.Component{


  campaignClick = (e) => {
    const { campaign } = this.props;
    this.props.setCampaign(campaign)
    this.props.history.push(`/campaign/${campaign.id}`)
  }

  renderCard = () => {
    const { classes } = this.props;
    const { campaign } = this.props;
  return  (
    <div>
      <Card className={classes.card}>
      <CardActionArea disableActionSpacing style={{minWidth: 370, maxWidth: '30vw',}} onClick={this.campaignClick}>
        <CardHeader style={{maxHeight: 75}} title={campaign.title} />
          <CardContent >
            <Typography className={classes.pos} component="p">
              {campaign.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Typography className={classes.pos}>
            <Button size='small' color='secondary'>
              GM: @{campaign.dungeonmaster.username}
            </Button>
            {/* <IconButton mini>
            <EditOutlinedIcon fontSize='small'/>
            </IconButton>
            <IconButton mini>
            <DeleteOutlinedIcon fontSize='small' onClick={() => this.props.deleteCampaign(campaign, this.props.history)}/>
            </IconButton> */}
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

export default withRouter(
  compose(
    connect(null, { setCampaign, deleteCampaign }),
  withStyles(styles))(CampaignCard));
