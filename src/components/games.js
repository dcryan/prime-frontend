import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IconButton from '@material-ui/core/IconButton';
import { Typography } from '@material-ui/core';
import Header from './header';
import { useCollection } from '../hooks/firebase';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
  },
  text: {
    textAlign: 'center',
  },
}));

export default function Games() {
  const classes = useStyles();
  const { error, loading, collection: games } = useCollection('games');

  return (
    <div>
      <Header
        title="Games"
        rightBarButton={
          <Link color="inherit" component={RouterLink} to="/games/create">
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            >
              <FontAwesomeIcon icon="plus" />
            </IconButton>
          </Link>
        }
      />

      {error && (
        <Typography className={classes.text}>Error Occurred</Typography>
      )}

      {loading && <Typography className={classes.text}>Loading...</Typography>}

      {!loading && games && games.length === 0 && (
        <Typography className={classes.text}>No Games</Typography>
      )}

      <List className={classes.root}>
        {games &&
          games.map(game => (
            <ListItem>
              <ListItemText
                primary={game.name}
                secondary={game.location.name}
              />
            </ListItem>
          ))}
      </List>
    </div>
  );
}
