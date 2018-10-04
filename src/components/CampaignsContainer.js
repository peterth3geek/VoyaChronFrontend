import React from 'react';
import { connect } from 'react-redux'
import compose from 'recompose/compose'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import CampaignCard from './CampaignCard'
import NoDataCard from './NoDataCard'
import CampaignForm from './CampaignForm'

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


const styles = {
  card: {
    width: '50vw',
    height: '89vh',
    overflow: 'auto',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '2vh',
    backgroundColor: 'inherit',
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridTile: {
    minWidth: 400,
    maxWidth: '30vw',
    height: 350,
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

class CampaignsContainer extends React.Component{
  state = {
    loading: true,
    setOpen: false
  }

  handleClose = () => {
    this.setState({setOpen: false})
  }

  mountCampaigns = (style) => {
    if(this.props.campaigns.length > 0){

      const { campaigns } = this.props
      const checker = []
      const filteredCampaigns = []

      for(let i=0; i<campaigns.length; i++) {
        if( checker[campaigns[i].id]) continue;
        checker[campaigns[i].id] = true;
        filteredCampaigns.push(campaigns[i]);
      }

      // const filteredCampaigns = campains.filter(campaign => )

      return filteredCampaigns.map(campaign => {
        // console.log(campaign)
        return (<GridListTile style={{height: 375}} className={style}>
        <CampaignCard key={campaign.id} campaign={campaign} />
      </GridListTile>)
        })
    } else {
      return <NoDataCard type='Campaign' handleOpen={() => this.setState({setOpen: true})} />
    }

  }

  componentDidMount(){
    this.setState({loading: false})
  }

  render () {
    const { classes } = this.props;

    const flexContainer = {
      padding: '0.5vw',
      overflow: 'scroll',
      alignItems: 'center',
    }

    // console.log()

    return (
      <div className={classes.card}>
        <CampaignForm open={this.state.setOpen} user={this.props.currentUser} handleClose={this.handleClose}/>
        <div>
          <Typography variant='display2' component='h1'>
            Campaigns
            <IconButton color='primary' onClick={() => this.setState({setOpen: true})}>
              <AddIcon fontSize='small'/>
            </IconButton>
          </Typography>
        </div>
        <div  style={flexContainer}>
          <GridList className={classes.grid} cols={2}>
          {this.mountCampaigns(classes.gridTile)}
        </GridList>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    campaigns: [...state.initReducer.currentUser.campaigns],
  }
}

CampaignsContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default compose(withStyles(styles), connect(mapStateToProps))(CampaignsContainer)
