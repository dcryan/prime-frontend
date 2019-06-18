import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Dialog,
  DialogTitle,
} from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  title: {
    textAlign: 'center',
  },
});

export default function SongList({ songList, currentSongIndex, ...other }) {
  const classes = useStyles();

  return (
    <Dialog aria-labelledby="simple-dialog-title" {...other}>
      <DialogTitle className={classes.title}>Track List</DialogTitle>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Letter</TableCell>
            <TableCell>Song Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {songList.map((song, songIndex) => (
            <TableRow
              key={song.song}
              style={{
                backgroundColor:
                  songIndex <= currentSongIndex ? '#eee' : 'inherited',
              }}
            >
              <TableCell>{song.letter}</TableCell>
              <TableCell component="th" scope="row">
                {song.song}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Dialog>
  );
}

SongList.propTypes = {
  songList: PropTypes.array,
  currentSongIndex: PropTypes.number,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  selectedValue: PropTypes.string,
};
