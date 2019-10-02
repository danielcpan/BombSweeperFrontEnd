import axios from 'axios';
import { normalize } from 'normalizr';
import * as schema from '../schema';
import store from '../store';
import { logError } from './errorActions';

import {
  FETCH_LEADERBOARD_REQUEST,
  FETCH_LEADERBOARD_SUCCESS,
  FETCH_LEADERBOARD_FAILURE,
  ADD_HIGH_SCORE_REQUEST,
  ADD_HIGH_SCORE_SUCCESS,
  ADD_HIGH_SCORE_FAILURE,
  RESET_IS_SUBMITTED
} from '../constants/actionTypes';

const env = process.env.NODE_ENV || 'development';
const { API_URL } = require('../config/config')[env];

// FETCH LEADERBOARD ACTIONS
export const fetchLeaderboardRequest = () => ({
  type: FETCH_LEADERBOARD_REQUEST,
});

export const fetchLeaderboardSuccess = (difficulty, scores, ids) => ({
  type: FETCH_LEADERBOARD_SUCCESS,
  payload: scores,
  difficulty,
  ids,
});

export const fetchLeaderboardFailure = (err) => ({
  type: FETCH_LEADERBOARD_FAILURE,
  payload: err.split(','),
});

export const fetchLeaderboard = (params) => async (dispatch) => {
  const { difficulty } = params;
  const scoreIds = store.getState().leaderboard[`${difficulty}Ids`];

  if (scoreIds.length > 0) return;

  try {
    dispatch(fetchLeaderboardRequest());
    const response = await axios.get(`${API_URL}/api/leaderboard`, { params });
    const normalizedData = normalize(response.data, schema.leaderboardSchema);
    const { entities: { scores }, result } = normalizedData;

    dispatch(fetchLeaderboardSuccess(difficulty, scores, result));
  } catch (err) {
    // API Errors
    if (err.response) dispatch(fetchLeaderboardFailure(err.response.data));
    //General Errors
    dispatch(logError(err.message));
  }
};

export const addHighScoreRequest = () => ({
  type: ADD_HIGH_SCORE_REQUEST,
});

export const addHighScoreSuccess = (highScore) => ({
  type: ADD_HIGH_SCORE_SUCCESS,
  payload: highScore,
});

export const addHighScoreFailure = (err) => ({
  type: ADD_HIGH_SCORE_FAILURE,
  payload: err,
});

export const addHighScore = (data) => async (dispatch) => {
  try {
    dispatch(addHighScoreRequest());
    const response = await axios.post(`${API_URL}/api/leaderboard`, data);
    dispatch(addHighScoreSuccess(response.data));
  } catch (err) {
    // API Errors
    if (err.response) dispatch(addHighScoreFailure(err.response.data));
    //General Errors
    dispatch(logError(err));
  }
};

export const resetIsSubmitted = () => ({
  type: RESET_IS_SUBMITTED
})
