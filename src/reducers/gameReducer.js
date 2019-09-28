import {
  SET_GAME_DIFFICULTY,
  UPDATE_GAME_SCORE,
  UPDATE_GAME_STATUS,
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
    switch (action.type) {
      case SET_GAME_DIFFICULTY:
        return { 
          ...state, 
          ...action.payload,
          score: 0,
          isGameOver: false
        };
      case UPDATE_GAME_SCORE:
        return { 
          ...state, 
          score: action.payload
        };
      case UPDATE_GAME_STATUS:
          return { 
            ...state, 
            ...action.payload
          };          
      default:
        return state;
    }
  }