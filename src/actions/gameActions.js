import {
  UPDATE_GAME,
} from '../constants/actionTypes';

// FETCH LEADERBOARD ACTIONS
export const updateGame = (settings) => ({
  type: UPDATE_GAME,
  payload: settings
});