import { combineReducers } from 'redux';
// import gameReducer from './gameReducer';
// import boardReducer from './boardReducer';
import leaderboardReducer from './leaderboardReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  // game: gameReducer,
  // board: boardReducer,
  leaderboard: leaderboardReducer,
  errors: errorReducer
});
