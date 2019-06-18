import React from 'react';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useDocumentData } from '../../hooks/firebase';
import GameBoard from '../game-board/game-board';
import './game-boards.css';

function printHorizontal() {
  const css = '@page { size: landscape; }';
  const head = document.head || document.getElementsByTagName('head')[0];
  const style = document.createElement('style');

  style.type = 'text/css';
  style.media = 'print';

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }

  head.appendChild(style);
}

export default function GameBoards({ match, location }) {
  const { error, loading, document: game } = useDocumentData(
    `games/${match.params.gameId}`
  );

  const query = new URLSearchParams(location.search);
  const printInLargeFont = query.get('printInLargeFont') === 'true';

  console.log(game);

  if (printInLargeFont) {
    printHorizontal();
  }

  return (
    <div className="game-boards">
      {loading && <LinearProgress className="progress-bar" />}
      {error && (
        <Typography className="error">Error: {error.message}</Typography>
      )}

      {game &&
        game.game &&
        game.game.gameBoards &&
        game.game.gameBoards.map((gameBoard, index) => (
          <React.Fragment key={index}>
            <div className="game-board-container" key={index}>
              <GameBoard
                cardNumber={index}
                name={game.name}
                dateTime={game.dateTime}
                genres={game.genres}
                gameBoard={gameBoard}
              />
            </div>
            {index % 2 === 0 && <hr className="dashed-line" />}
            {index % 2 === 1 && <div className="page-break" />}
          </React.Fragment>
        ))}
    </div>
  );
}

GameBoards.propTypes = {
  match: PropTypes.object,
  location: PropTypes.object,
};
