import {
  UPDATE_GAME_SETTINGS,
  UPDATE_GAME_SCORE,
  UPDATE_GAME_STATUS,
} from '../constants/actionTypes';

const initialState = {
  rows: 9,
  cols: 9,
  mineCount: 10,
  score: 0,
  isGameOver: false,
};

  export default (state = initialState, action) => {
    switch (action.type) {
      case UPDATE_GAME_SETTINGS:
        console.log("here!")
        console.log(action.payload)
        return { 
          ...state, 
          rows: action.payload.rows,
          cols: action.payload.cols,
          mineCount: action.payload.mineCount,
          // ...action.payload
        };
      case UPDATE_GAME_SCORE:
        return { 
          ...state, 
          score: action.payload
        };
      case UPDATE_GAME_STATUS:
          return { 
            ...state, 
            isGameOver: action.payload.isGameOver
          };          
      default:
        return state;
    }
  }