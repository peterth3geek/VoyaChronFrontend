import React from 'react';
import { connect } from 'react-redux'
import compose from 'recompose/compose'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import CharacterCard from './CharacterCard'
import NoDataCard from './NoDataCard'

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    marginLeft: '2vw',
    marginRight: '2vw',
    marginBottom: '2vh',
    backgroundColor: 'inherit'
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};


class CharactersContainer extends React.Component{
  state = {
    loading: true
  }

  mountCharacters = () => {
    if(this.props.characters.length > 0){
      return  this.props.characters.map(character => {
          return <CharacterCard key={character.id} character={character} campaign={character.campaign} />
        })
    } else {
      return <NoDataCard type='Character'/>
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
      padding: '0.5vw',
      overflow: 'scroll'
    }

    return (
      <div>
        <Card className={classes.card}>
          <div>
          <Typography variant='headline' component='h1'>
            Characters:
          </Typography>
        </div>
        <CardContent style={flexContainer}>
            {this.mountCharacters()}
          </CardContent>
        </Card>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    characters: state.initReducer.currentUser.characters
  }
}

CharactersContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default compose(withStyles(styles), connect(mapStateToProps))(CharactersContainer)
