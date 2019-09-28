import { combineReducers } from 'redux';
import gameReducer from './gameReducer';
import boardReducer from './boardReducer';
import leaderboardReducer from './leaderboardReducer';

export default combineReducers({
  game: gameReducer,
  board: boardReducer,
  leaderboard: leaderboardReducer,
});