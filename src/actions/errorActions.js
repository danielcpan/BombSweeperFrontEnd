import { LOG_ERROR, RESET_ERRORS } from '../constants/actionTypes';

export const logError = (err) => dispatch => {
  let loggedError = err;
  
  if (err.response) loggedError = err.response.data;
  else if (err.message) loggedError = err.message;

  dispatch({
    type: LOG_ERROR,
    error: loggedError
  })
};

export const resetErrors = () => ({
  type: RESET_ERRORS,
});

