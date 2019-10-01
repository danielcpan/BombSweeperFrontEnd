import { RESET_ERRORS } from '../constants/actionTypes';

export default (state = [], action) => { // eslint-disable-line no-unused-vars
  const { type, error } = action;

  if (type === RESET_ERRORS) {
    return [];
  } else if (error) {
    return [...state, error];
  }

  return state;
};