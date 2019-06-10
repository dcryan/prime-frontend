export const ACTIONS = {
  SET_USER: 'SET_USER',
};

export const getCurrentUser = () => async dispatch => {
  const user = {};

  dispatch({
    type: ACTIONS.SET_USER,
    payload: user,
  });
};
