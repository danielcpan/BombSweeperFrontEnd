import {
  SET_GAME_DIFFICULTY,
  UPDATE_GAME_SCORE,
  UPDATE_GAME_STATUS
} from '../constants/actionTypes';

export const setGameDifficulty = settings => ({
  type: SET_GAME_DIFFICULTY,
  payload: settings
})

export const updateGameStatus = status => ({
  type: UPDATE_GAME_STATUS,
  payload: status
})

export const updateGameScore = score => ({
  type: UPDATE_GAME_SCORE,
  payload: score
})
