import { combineReducers } from 'redux';
import gameReducer from './gameReducer';
import leaderboardReducer from './leaderboardReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  game: gameReducer,
  leaderboard: leaderboardReducer,
  errors: errorReducer,
});
