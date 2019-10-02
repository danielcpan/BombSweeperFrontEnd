import {
  UPDATE_GAME,
} from '../constants/actionTypes';

import * as DifficultyTypes from '../constants/difficultyTypes';

const initialState = {
  difficultyType: DifficultyTypes.BEGINNER,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_GAME:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};
