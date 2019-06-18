import React, { useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Typography, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Header from './header';
import { useDocumentData } from '../hooks/firebase';
import SongList from './song-list';
import CheckBingoCard from './check-bingo-card';
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
    margin: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },

  topButtons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  letterContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  letterInnerContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
  },

  letter: {
    backgroundColor: '#ddd',
    width: 100,
    height: 100,
    borderRadius: 8,
  },

  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: 'none',
  },
}));

export default function BingoGame({ match, history }) {
  const classes = useStyles();
  const [currentSongIndex, changeCurrentSongIndex] = useState(0);
  const [isPlaying, changeIsPlaying] = useState(false);
  const [isPlaying30Seconds, changeIsPlaying30Seconds] = useState(false);
  const [isTrackListVisible, changeIsTrackListVisible] = useState(false);
  const [isCheckBingoCardVisible, changeIsCheckBingoCardVisible] = useState(
    false
  );
  const { error, loading, document: game } = useDocumentData(
    `games/${match.params.gameId}`
  );

  const playButtonPressed = () => {
    changeIsPlaying(!isPlaying);
    changeIsPlaying30Seconds(false);
  };

  const play30SecondButtonPressed = () => {
    changeIsPlaying(false);
    changeIsPlaying30Seconds(!isPlaying30Seconds);
  };

  return (
    <div className={classes.root}>
      <Header
        title="Bingo Game"
        loading={loading}
        error={error}
        history={history}
        hideMenu
        backButton
      />

      <Layout>
        <div className={classes.container}>
          {game && (
            <div>
              <div className={classes.topButtons}>
                <Button onClick={() => changeIsTrackListVisible(true)}>
                  <div>
                    <div>TrackList</div>
                    <div>
                      <FontAwesomeIcon icon={['far', 'list']} />
                    </div>
                  </div>
                </Button>
                <Button onClick={() => changeIsCheckBingoCardVisible(true)}>
                  <div>
                    <div>Check Bingo Card</div>
                    <div>
                      <FontAwesomeIcon icon={['far', 'copy']} />
                    </div>
                  </div>
                </Button>
              </div>

              <SongList
                songList={game.game.songList}
                currentSongIndex={currentSongIndex}
                open={isTrackListVisible}
                onClose={() => changeIsTrackListVisible(false)}
              />

              <CheckBingoCard
                open={isCheckBingoCardVisible}
                onClose={() => changeIsCheckBingoCardVisible(false)}
                currentSongIndex={currentSongIndex}
                songList={game.game.songList}
                gameBoards={game.game.gameBoards}
              />

              <div className={classes.letterContainer}>
                <div className={classes.letter}>
                  <div className={classes.letterInnerContainer}>
                    <Typography variant="h2">
                      {game.game.songList[currentSongIndex].letter}
                    </Typography>
                  </div>
                </div>
              </div>

              <div>
                <Typography variant="h4">
                  {game.game.songList[currentSongIndex].song}
                </Typography>
                <Typography variant="h5">Artist</Typography>
              </div>

              <LinearProgress variant="determinate" value={50} />

              <div>
                <Button
                  onClick={() => changeCurrentSongIndex(currentSongIndex - 1)}
                  disabled={currentSongIndex === 0}
                >
                  <Typography variant="h4">
                    <FontAwesomeIcon icon={['far', 'step-backward']} />
                  </Typography>
                </Button>
                <Button onClick={playButtonPressed}>
                  <div>
                    <Typography variant="h4">
                      {isPlaying && (
                        <FontAwesomeIcon icon={['far', 'pause-circle']} />
                      )}

                      {!isPlaying && (
                        <FontAwesomeIcon icon={['far', 'play-circle']} />
                      )}
                      <Typography>Play full</Typography>
                    </Typography>
                  </div>
                </Button>
                <Button onClick={play30SecondButtonPressed}>
                  <div>
                    <Typography variant="h4">
                      {isPlaying30Seconds && (
                        <FontAwesomeIcon icon={['far', 'pause-circle']} />
                      )}

                      {!isPlaying30Seconds && (
                        <FontAwesomeIcon icon={['far', 'play-circle']} />
                      )}
                    </Typography>
                    <Typography>Play 30s</Typography>
                  </div>
                </Button>
                <Button
                  onClick={() => changeCurrentSongIndex(currentSongIndex + 1)}
                  disabled={currentSongIndex === game.game.songList.length - 1}
                >
                  <Typography variant="h4">
                    <FontAwesomeIcon icon={['far', 'step-forward']} />
                  </Typography>
                </Button>
              </div>
            </div>
          )}
        </div>
      </Layout>
    </div>
  );
}

BingoGame.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
};
