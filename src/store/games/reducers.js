import { ACTIONS } from './actions';

const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ACTIONS.LOADING_GAMES:
      return { ...state, ...payload };

    case ACTIONS.SET_GAMES:
      return { ...state, ...payload };

    default:
      return state;
  }
};
