import React, { useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Typography, Button, Switch } from '@material-ui/core';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Header from './header';
import { useDocumentData } from '../hooks/firebase';
import { useFirebase } from '../firebase';
import { generateGame } from '../services/generate-game';
import Layout from './layout';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  text: {
    textAlign: 'center',
  },

  container: {
    textAlign: 'center',
    marginTop: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  printGameBoardsContainer: {
    margin: 8,
  },

  largePrintFontSwitchContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

export default function Game({ match, history }) {
  const firebase = useFirebase();
  const classes = useStyles();
  const [printInLargeFont, setPrintInLargeFont] = useState(false);
  const { error, loading, document: game } = useDocumentData(
    `games/${match.params.gameId}`
  );

  const clickedGenerateGame = async () => {
    const gameRef = await firebase
      .firestore()
      .doc(`games/${match.params.gameId}`);

    const generatedGame = generateGame(game);

    gameRef.update({ game: generatedGame });
  };

  const clickedGoToGame = () => {
    history.push(`${match.params.gameId}/start`);
  };

  return (
    <div className={classes.root}>
      <Header
        title="Game"
        loading={loading}
        error={error}
        hideMenu
        backButton
        history={history}
      />
      {game && (
        <Layout>
          <div className={classes.container}>
            <Typography variant="h3">{game.name}</Typography>
            <Typography variant="h5">{game.locationId}</Typography>
            <Typography variant="h6">
              {format(game.dateTime.toDate(), 'EEEE MMM Qo')} -{' '}
              {format(game.dateTime.toDate(), 'h:mm b')}
            </Typography>

            <Typography variant="h6">Card Count: {game.cardCount}</Typography>
            <Typography variant="h6">Genres: {game.genres}</Typography>

            {!game.game && (
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={clickedGenerateGame}
              >
                Generate Game
              </Button>
            )}

            {game.game && (
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={clickedGoToGame}
              >
                Go To Game
              </Button>
            )}

            {game.game && game.game.gameBoards && (
              <div className={classes.printGameBoardsContainer}>
                <Typography>Game Boards</Typography>
                <div className={classes.largePrintFontSwitchContainer}>
                  <Typography>Large Print Font?</Typography>
                  <Switch
                    checked={printInLargeFont}
                    onChange={e => setPrintInLargeFont(e.target.checked)}
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                  />
                </div>
                <Link
                  style={{ textDecoration: 'none' }}
                  color="inherit"
                  component={RouterLink}
                  target="_blank"
                  to={`${
                    match.params.gameId
                  }/game-boards?printInLargeFont=${printInLargeFont}`}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    className={classes.submitButton}
                  >
                    Print Game Boards
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </Layout>
      )}
    </div>
  );
}

Game.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
};
