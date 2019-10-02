import {
  FETCH_LEADERBOARD_REQUEST,
  FETCH_LEADERBOARD_SUCCESS,
  FETCH_LEADERBOARD_FAILURE,
  ADD_HIGH_SCORE_REQUEST,
  ADD_HIGH_SCORE_SUCCESS,
  ADD_HIGH_SCORE_FAILURE,
  RESET_IS_SUBMITTED,
} from '../constants/actionTypes';

const initialState = {
  isSubmitted: false,
  isLoading: false,
  hasErrored: false,
  error: null,
  byId: {},
  beginnerIds: [],
  intermediateIds: [],
  expertIds: [],
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_HIGH_SCORE_REQUEST:
    case FETCH_LEADERBOARD_REQUEST:
      return {
        ...state,
        isLoading: true,
        isSubmitted: false,
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
        isSubmitted: false,
        hasErrored: true,
        error: payload,
      };
    case ADD_HIGH_SCORE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSubmitted: true,
        hasErrored: false,
        error: null,
      };
    case RESET_IS_SUBMITTED:
      return {
        ...state,
        isSubmitted: false,
      };
    default:
      return state;
  }
};

// SELECTORS
export const getLeaderboardWithRank = (state) => {
  return state.leaderboard[`${state.game.difficultyType}Ids`].map((id, idx) => {
    const score = state.leaderboard.byId[id];
    score.rank = idx + 1;
    return score;
  }
)};

