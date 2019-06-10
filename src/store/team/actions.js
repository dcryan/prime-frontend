export const ACTIONS = {
  SET_TEAM_INFO: 'SET_TEAM_INFO',
  SET_TEAM: 'SET_TEAM',
};

export const getTeamInfo = () => async dispatch => {
  const payload = {};
  dispatch({
    type: ACTIONS.SET_TEAM_INFO,
    payload,
  });
};
