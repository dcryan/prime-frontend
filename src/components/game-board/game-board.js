import React from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import './game-board.css';

export default function GameBoard({
  cardNumber,
  gameBoard: { b, i, n, g, o },
  name,
  dateTime,
  genres,
}) {
  return (
    <table className="game-board">
      <thead>
        <tr>
          <th>B</th>
          <th>I</th>
          <th>N</th>
          <th>G</th>
          <th>O</th>
        </tr>
      </thead>
      <tbody>
        {/* 1st Row */}
        <tr>
          <td>
            <div>{b[0]}</div>
            <div className="bold">{b[0]}</div>
          </td>
          <td>
            <div>{i[0]}</div>
            <div className="bold">{i[0]}</div>
          </td>
          <td>
            <div>{n[0]}</div>
            <div className="bold">{n[0]}</div>
          </td>
          <td>
            <div>{g[0]}</div>
            <div className="bold">{g[0]}</div>
          </td>
          <td>
            <div>{o[0]}</div>
            <div className="bold">{o[0]}</div>
          </td>
        </tr>
        {/* 2nd Row */}
        <tr>
          <td>
            <div>{b[1]}</div>
            <div className="bold">{b[1]}</div>
          </td>
          <td>
            <div>{i[1]}</div>
            <div className="bold">{i[1]}</div>
          </td>
          <td>
            <div>{n[1]}</div>
            <div className="bold">{n[1]}</div>
          </td>
          <td>
            <div>{g[1]}</div>
            <div className="bold">{g[1]}</div>
          </td>
          <td>
            <div>{o[1]}</div>
            <div className="bold">{o[1]}</div>
          </td>
        </tr>
        {/* 3rd Row */}
        <tr>
          <td>
            <div>{b[2]}</div>
            <div className="bold">{b[2]}</div>
          </td>
          <td>
            <div>{i[2]}</div>
            <div className="bold">{i[2]}</div>
          </td>
          <td>
            <div>{n[2]}</div>
            <div className="bold">{n[2]}</div>
          </td>
          <td>
            <div>{g[2]}</div>
            <div className="bold">{g[2]}</div>
          </td>
          <td>
            <div>{o[2]}</div>
            <div className="bold">{o[2]}</div>
          </td>
        </tr>
        {/* 4th Row */}
        <tr>
          <td>
            <div>{b[3]}</div>
            <div className="bold">{b[3]}</div>
          </td>
          <td>
            <div>{i[3]}</div>
            <div className="bold">{i[3]}</div>
          </td>
          <td>
            <div>{n[3]}</div>
            <div className="bold">{n[3]}</div>
          </td>
          <td>
            <div>{g[3]}</div>
            <div className="bold">{g[3]}</div>
          </td>
          <td>
            <div>{o[3]}</div>
            <div className="bold">{o[3]}</div>
          </td>
        </tr>
        {/* 5th Row */}
        <tr>
          <td>
            <div>{b[4]}</div>
            <div className="bold">{b[4]}</div>
          </td>
          <td>
            <div>{i[4]}</div>
            <div className="bold">{i[4]}</div>
          </td>
          <td>
            <div>{n[4]}</div>
            <div className="bold">{n[4]}</div>
          </td>
          <td>
            <div>{g[4]}</div>
            <div className="bold">{g[4]}</div>
          </td>
          <td>
            <div>{o[4]}</div>
            <div className="bold">{o[4]}</div>
          </td>
        </tr>
        <tr className="copyright-row">
          <td colSpan={5}>
            {name} - {genres} - {format(dateTime.toDate(), 'EEEE MMM Qo')} - ©
            2019 Game Night Live! https://gamenightlive.com - Card {cardNumber}
          </td>
        </tr>
      </tbody>
    </table>
  );
}

GameBoard.propTypes = {
  cardNumber: PropTypes.number,
  gameBoard: PropTypes.object,
  name: PropTypes.string,
  dateTime: PropTypes.object,
  genres: PropTypes.array,
};
