export const ACTIONS = {
  LOADING_GAMES: 'LOADING_GAMES',
  SET_GAMES: 'SET_GAMES',
};

const loadingGames = () => ({
  type: ACTIONS.LOADING_GAMES,
  payload: {
    loading: true,
  },
});

const setGames = games => ({
  type: ACTIONS.SET_GAMES,
  payload: {
    list: games,
    loading: false,
  },
});

export const fetchGames = firebase => async dispatch => {
  dispatch(loadingGames);
  const games = await firebase.getGames();
  dispatch(setGames(games));
};
