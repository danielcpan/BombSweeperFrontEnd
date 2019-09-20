import { combineReducers } from 'redux';
import gameReducer from './gameReducer';
import boardReducer from './boardReducer';

export default combineReducers({
  game: gameReducer,
  board: boardReducer,
});