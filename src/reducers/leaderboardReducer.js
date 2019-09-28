import {
  FETCH_LEADERBOARD_REQUEST,
  FETCH_LEADERBOARD_SUCCESS,
  FETCH_LEADERBOARD_FAILURE,  
} from '../constants/actionTypes';

const initialState = {
  isLoading: false,
  hasErrored: false,
  error: null,
  scores: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LEADERBOARD_REQUEST:
      return { 
        ...state, 
        isLoading: true,
        hasErrored: false, 
        error: null 
      };
    case FETCH_LEADERBOARD_SUCCESS:
      return { 
        ...state, 
        isLoading: false,
        hasErrored: false,
        error: null,
        scores: action.payload
      };
    case FETCH_LEADERBOARD_FAILURE:
      return { 
        ...state, 
        isLoading: false,
        hasErrored: true, 
        error: action.payload 
      };
    default:
      return state;
  }
}