import { songs } from '../constants';

/**
 * Shuffle function
 * https://bost.ocks.org/mike/shuffle/
 *
 * @param {*} array
 */
function shuffle(array) {
  let m = array.length;
  let t;
  let i;

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m);
    m -= 1;

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

function generateGameBoards(songListIndexedByLetter, cardCount) {
  // At least 25 songs

  // First board is:
  // B   I   N   G   O
  // -----------------
  // 1   6   11  16  21
  // 2   7   12  17  22
  // 3   8   13  18  23
  // 4   9   14  19  24
  // 5   10  15  20  25

  // Just randomly generate the boards, the chances of a collision
  // for the minimum of 25 songs is
  // (5! ^ 5) / 50 = ~500,000,000 to 1
  const gameBoards = [];
  for (let index = 0; index < cardCount; index += 1) {
    const bShuffled = shuffle(songListIndexedByLetter.B);
    const iShuffled = shuffle(songListIndexedByLetter.I);
    const nShuffled = shuffle(songListIndexedByLetter.N);
    const gShuffled = shuffle(songListIndexedByLetter.G);
    const oShuffled = shuffle(songListIndexedByLetter.O);

    const b = bShuffled.slice(0, 5);
    const i = iShuffled.slice(0, 5);
    const n = nShuffled.slice(0, 5);
    const g = gShuffled.slice(0, 5);
    const o = oShuffled.slice(0, 5);

    // We can't do this:
    //
    // const gameBoard = [ b, i, n, g, o ];
    //
    // Firebase can't support nested arrays, so we can't have an array of arrays
    // we need to piece it out by letters.
    const gameBoard = { b, i, n, g, o };
    gameBoards.push(gameBoard);
  }

  return gameBoards;
}

function getSectionRanges(songListCount) {
  if (songListCount < 25) {
    throw Error(
      `songList needs to be greater than 25. songList is ${songListCount}`
    );
  }
  // Get the amount of songs in each section
  let sectionAmountB = Math.floor(songListCount / 5);
  let sectionAmountI = Math.floor(songListCount / 5);
  const sectionAmountN = Math.floor(songListCount / 5);
  let sectionAmountG = Math.floor(songListCount / 5);
  let sectionAmountO = Math.floor(songListCount / 5);

  const extraSongs = songListCount % 5;

  // Add the extra songs to the ends of BIGO, ignore
  // N because it already has a Free Space.
  if (extraSongs >= 4) {
    sectionAmountB += 1;
    sectionAmountI += 1;
    sectionAmountG += 1;
    sectionAmountO += 1;
  } else if (extraSongs >= 3) {
    sectionAmountB += 1;
    sectionAmountI += 1;
    sectionAmountG += 1;
  } else if (extraSongs >= 2) {
    sectionAmountB += 1;
    sectionAmountI += 1;
  } else if (extraSongs >= 1) {
    sectionAmountB += 1;
  }
  const rangeEndB = sectionAmountB;
  const rangeEndI = rangeEndB + sectionAmountI;
  const rangeEndN = rangeEndI + sectionAmountN;
  const rangeEndG = rangeEndN + sectionAmountG;
  const rangeEndO = rangeEndG + sectionAmountO;

  return [rangeEndB, rangeEndI, rangeEndN, rangeEndG, rangeEndO];
}

function generateSongListLetterMaps(songList) {
  const [
    rangeEndB,
    rangeEndI,
    rangeEndN,
    rangeEndG,
    rangeEndO,
  ] = getSectionRanges(songList.length);

  const songListIndexedByLetter = { B: [], I: [], N: [], G: [], O: [] };
  const songLetterFlatList = songList.map((song, i) => {
    let letter;
    if (i < rangeEndB) {
      letter = 'B';
      songListIndexedByLetter.B.push(song);
    } else if (i < rangeEndI) {
      letter = 'I';
      songListIndexedByLetter.I.push(song);
    } else if (i < rangeEndN) {
      letter = 'N';
      songListIndexedByLetter.N.push(song);
    } else if (i < rangeEndG) {
      letter = 'G';
      songListIndexedByLetter.G.push(song);
    } else if (i < rangeEndO) {
      letter = 'O';
      songListIndexedByLetter.O.push(song);
    }

    return { song, letter };
  });

  return [songLetterFlatList, songListIndexedByLetter];
}

export function generateGame({ cardCount, genres }) {
  // create a playlist of songs from the genres picked.
  // Randomly assocate B-I-N-G-O to the songs
  const songList = genres.map(genre => songs[genre]).flat();

  const shuffledSongList = shuffle(songList);

  const [
    songLetterFlatList,
    songListIndexedByLetter,
  ] = generateSongListLetterMaps(shuffledSongList);

  const gameBoards = generateGameBoards(songListIndexedByLetter, cardCount);

  const shuffledSongLetterFlatList = shuffle(songLetterFlatList);

  return { songList: shuffledSongLetterFlatList, gameBoards };
}
