import {
  UPDATE_GAME_SETTINGS,
  UPDATE_GAME_SCORE,
  UPDATE_GAME_STATUS
} from '../constants/actionTypes';

export const updateGameSettings = settings => ({
  type: UPDATE_GAME_SETTINGS,
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
