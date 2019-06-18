import React, { useMemo } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IconButton from '@material-ui/core/IconButton';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import Header from './header';
import { useCollectionWithQuery } from '../hooks/firebase';
import Layout from './layout';
import { useFirebase } from '../firebase';
import { useUser } from '../session';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
  text: {
    textAlign: 'center',
  },
}));

export default function Games({ history }) {
  const classes = useStyles();
  const firebase = useFirebase();
  const currentUser = useUser();
  const query = useMemo(
    () =>
      firebase
        .firestore()
        .collection('games')
        .where('teamId', '==', currentUser.user.teamId),
    [firebase, currentUser.user.teamId]
  );

  const { error, loading, collection: games } = useCollectionWithQuery(query);

  console.log(games);

  const goToGame = gameId => {
    history.push(`games/${gameId}`);
  };

  return (
    <div>
      <Header
        title="Games"
        loading={loading}
        error={error}
        history={history}
        rightBarButton={
          <Link color="inherit" component={RouterLink} to="/games/create">
            <IconButton edge="start" color="inherit" aria-label="Menu">
              <FontAwesomeIcon icon="plus" />
            </IconButton>
          </Link>
        }
      />

      <Layout>
        {games && games.length === 0 && (
          <Typography className={classes.text}>No Games</Typography>
        )}

        <List className={classes.root}>
          {games &&
            games.map(gameMetaData => {
              const game = gameMetaData.data();
              debugger;
              const gameId = gameMetaData.id;
              return (
                <ListItem
                  key={game.name}
                  button
                  onClick={() => goToGame(gameId)}
                >
                  <ListItemText
                    primary={game.name}
                    secondary={game.locationId}
                  />
                </ListItem>
              );
            })}
        </List>
      </Layout>
    </div>
  );
}

Games.propTypes = {
  history: PropTypes.object,
};
