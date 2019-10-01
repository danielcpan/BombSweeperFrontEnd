import {
  SET_GAME_DIFFICULTY,
  UPDATE_GAME_SCORE,
  UPDATE_GAME_STATUS,
  UPDATE_GAME
} from '../constants/actionTypes';

const initialState = {
  rows: 0,
  cols: 0,
  mineCount: 0,
  score: 0,
  isGameOver: false,
  isWin: false,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_GAME_DIFFICULTY:
    case UPDATE_GAME_STATUS:
    case UPDATE_GAME_SCORE:
    case UPDATE_GAME:
      return {
        ...state,
        ...payload,
      };      
    default:
      return state;
  }
};
