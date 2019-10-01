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
  byId: {},
  beginnerIds: [],
  intermediateIds: [],
  expertIds: [],
  highScore: {}
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_HIGH_SCORE_REQUEST:
    case FETCH_LEADERBOARD_REQUEST:
      return {
        ...state,
        isLoading: true,
        hasErrored: false,
        error: null,
      };
    case FETCH_LEADERBOARD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasErrored: false,
        error: null,
        byId: { ...state.byId, ...payload },
        [`${action.difficulty}Ids`]: action.ids,
      };
    case ADD_HIGH_SCORE_FAILURE:
    case FETCH_LEADERBOARD_FAILURE:
      return {
        ...state,
        isLoading: false,
        hasErrored: true,
        error: payload,
      };
    case ADD_HIGH_SCORE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasErrored: false,
        error: null,
        // scores: [...state.scores, action.payload]
      };
    default:
      return state;
  }
};

// SELECTORS
export const getLeaderboard = (state, difficulty) => state.leaderboard[`${difficulty}Ids`].map((id) => state.leaderboard.byId[id]);

export const getLeaderboardWithRank = (state, difficulty) => state.leaderboard[`${difficulty}Ids`].map((id, idx) => {
  const score = state.leaderboard.byId[id];
  score.rank = idx + 1;
  return score;
});
