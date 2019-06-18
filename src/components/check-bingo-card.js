import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Dialog,
  DialogTitle,
} from '@material-ui/core';

const useStyles = makeStyles({
  title: {
    textAlign: 'center',
  },
  submitButton: {},
  container: {},
  text: {},
});

export default function CheckBingoCard({
  gameBoards,
  songList,
  currentSongIndex,
  ...other
}) {
  const classes = useStyles();
  const [cardNumber, changeCardNumber] = useState('0');
  const [cardNumberToFind, changeCardNumberToFind] = useState(null);

  const changeCardNumberHandler = e => {
    changeCardNumber(e.target.value);
  };

  const changeCardNumberToFindHandler = () => {
    changeCardNumberToFind(cardNumber);
  };

  const generateBoard = () => {
    if (cardNumberToFind === null) return;

    const gameBoard = gameBoards[cardNumberToFind];
    const playedSongs = songList.slice(0, currentSongIndex + 1);

    const b = gameBoard.b.map(
      song =>
        playedSongs.find(playedSong => playedSong.song === song) !== undefined
    );
    const i = gameBoard.i.map(
      song =>
        playedSongs.find(playedSong => playedSong.song === song) !== undefined
    );
    const n = gameBoard.n.map(
      song =>
        playedSongs.find(playedSong => playedSong.song === song) !== undefined
    );
    const g = gameBoard.g.map(
      song =>
        playedSongs.find(playedSong => playedSong.song === song) !== undefined
    );
    const o = gameBoard.o.map(
      song =>
        playedSongs.find(playedSong => playedSong.song === song) !== undefined
    );

    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>B</TableCell>
            <TableCell>I</TableCell>
            <TableCell>N</TableCell>
            <TableCell>G</TableCell>
            <TableCell>O</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* 1st Row */}
          <TableRow>
            <TableCell>{b[0] ? '0' : ''}</TableCell>
            <TableCell>{i[0] ? '0' : ''}</TableCell>
            <TableCell>{n[0] ? '0' : ''}</TableCell>
            <TableCell>{g[0] ? '0' : ''}</TableCell>
            <TableCell>{o[0] ? '0' : ''}</TableCell>
          </TableRow>
          {/* 2nd Row */}
          <TableRow>
            <TableCell>{b[1] ? '0' : ''}</TableCell>
            <TableCell>{i[1] ? '0' : ''}</TableCell>
            <TableCell>{n[1] ? '0' : ''}</TableCell>
            <TableCell>{g[1] ? '0' : ''}</TableCell>
            <TableCell>{o[1] ? '0' : ''}</TableCell>
          </TableRow>
          {/* 3rd Row */}
          <TableRow>
            <TableCell>{b[2] ? '0' : ''}</TableCell>
            <TableCell>{i[2] ? '0' : ''}</TableCell>
            <TableCell>{n[2] ? '0' : ''}</TableCell>
            <TableCell>{g[2] ? '0' : ''}</TableCell>
            <TableCell>{o[2] ? '0' : ''}</TableCell>
          </TableRow>
          {/* 4th Row */}
          <TableRow>
            <TableCell>{b[3] ? '0' : ''}</TableCell>
            <TableCell>{i[3] ? '0' : ''}</TableCell>
            <TableCell>{n[3] ? '0' : ''}</TableCell>
            <TableCell>{g[3] ? '0' : ''}</TableCell>
            <TableCell>{o[3] ? '0' : ''}</TableCell>
          </TableRow>
          {/* 5th Row */}
          <TableRow>
            <TableCell>{b[4] ? '0' : ''}</TableCell>
            <TableCell>{i[4] ? '0' : ''}</TableCell>
            <TableCell>{n[4] ? '0' : ''}</TableCell>
            <TableCell>{g[4] ? '0' : ''}</TableCell>
            <TableCell>{o[4] ? '0' : ''}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  };

  const bingoCard = generateBoard();

  return (
    <Dialog aria-labelledby="simple-dialog-title" {...other}>
      <DialogTitle className={classes.title}>Check Bingo Card</DialogTitle>
      <TextField
        label="Card Number"
        className={classes.text}
        type="number"
        value={cardNumber}
        onChange={changeCardNumberHandler}
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        className={classes.submitButton}
        onClick={changeCardNumberToFindHandler}
        disabled={cardNumber === '' || +cardNumber >= gameBoards.length}
      >
        Find
      </Button>

      <div>{bingoCard}</div>
    </Dialog>
  );
}

CheckBingoCard.propTypes = {
  currentSongIndex: PropTypes.number,
  songList: PropTypes.array,
  gameBoards: PropTypes.array,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  selectedValue: PropTypes.string,
};
