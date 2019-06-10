import { ACTIONS } from './actions';

const initialState = {};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ACTIONS.SET_AUTH_USER:
      return { ...state, ...payload };

    default:
      return state;
  }
};
