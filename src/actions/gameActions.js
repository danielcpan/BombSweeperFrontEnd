import {
  SET_GAME_DIFFICULTY,
  UPDATE_GAME_SCORE,
  UPDATE_GAME_STATUS
} from '../constants/actionTypes';
import { BEGINNER, INTERMEDIATE, EXPERT } from '../constants/difficultyTypes'
import { BEGINNER_SETTINGS, INTERMEDIATE_SETTINGS, EXPERT_SETTINGS} from '../constants/difficultySettingsTypes';

export const setGameDifficulty = difficultyType => dispatch => {
  let difficultySettings = null;

  switch (difficultyType) {
    case BEGINNER:
      difficultySettings = BEGINNER_SETTINGS;
      break;
    case INTERMEDIATE:
      difficultySettings = INTERMEDIATE_SETTINGS;
      break;
    case EXPERT:
      difficultySettings = EXPERT_SETTINGS;
      break;
  }

  dispatch ({
    type: SET_GAME_DIFFICULTY,
    payload: difficultySettings,
  })
}

export const updateGameStatus = status => ({
  type: UPDATE_GAME_STATUS,
  payload: status
})

export const updateGameScore = score => ({
  type: UPDATE_GAME_SCORE,
  payload: score
})
