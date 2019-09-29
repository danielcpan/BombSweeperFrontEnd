import {
  FETCH_LEADERBOARD_REQUEST,
  FETCH_LEADERBOARD_SUCCESS,
  FETCH_LEADERBOARD_FAILURE,
  ADD_HIGH_SCORE_REQUEST,
  ADD_HIGH_SCORE_SUCCESS,
  ADD_HIGH_SCORE_FAILURE,  
} from '../constants/actionTypes';

const initialState = {
  isLoading: false,
  hasErrored: false,
  error: null,
  scores: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_HIGH_SCORE_REQUEST:
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
    case ADD_HIGH_SCORE_FAILURE:
    case FETCH_LEADERBOARD_FAILURE:
      return { 
        ...state, 
        isLoading: false,
        hasErrored: true, 
        error: action.payload 
      };
    case ADD_HIGH_SCORE_SUCCESS:
      return { 
        ...state, 
        isLoading: false,
        hasErrored: false,
        error: null,
        scores: [...state.scores, action.payload]
      };
    default:
      return state;
  }
}