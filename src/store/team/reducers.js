import { ACTIONS } from './actions';

const initialState = {};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ACTIONS.SET_TEAM_INFO:
      return { ...state, ...payload };

    default:
      return state;
  }
};
