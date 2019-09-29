import axios from 'axios';

import {
  FETCH_LEADERBOARD_REQUEST,
  FETCH_LEADERBOARD_SUCCESS,
  FETCH_LEADERBOARD_FAILURE,
  ADD_HIGH_SCORE_REQUEST,
  ADD_HIGH_SCORE_SUCCESS,
  ADD_HIGH_SCORE_FAILURE,
} from '../constants/actionTypes';

const env = process.env.NODE_ENV || 'development';
const { API_URL } = require('../config/config')[env];

// FETCH LEADERBOARD ACTIONS
export const fetchLeaderboardRequest = () => ({
  type: FETCH_LEADERBOARD_REQUEST,
})

export const fetchLeaderboardSuccess = leaderboard => ({
  type: FETCH_LEADERBOARD_SUCCESS,
  payload: leaderboard,
})

export const fetchLeaderboardFailure = err => ({
  type: FETCH_LEADERBOARD_FAILURE,
  payload: err,
})

export const fetchLeaderboard = params => async dispatch => {
  try {
    dispatch(fetchLeaderboardRequest());
    const response = await axios.get(`${API_URL}/api/leaderboard`, { params });

    dispatch(fetchLeaderboardSuccess(response.data));
  } catch (err) {
    dispatch(fetchLeaderboardFailure(err));
  }
}

export const addHighScoreRequest = () => ({
  type: ADD_HIGH_SCORE_REQUEST,
})

export const addHighScoreSuccess = highScore => ({
  type: ADD_HIGH_SCORE_SUCCESS,
  payload: highScore,
})

export const addHighScoreFailure = err => ({
  type: ADD_HIGH_SCORE_FAILURE,
  payload: err,
})

export const addHighScore = data => async dispatch => {
  try {
    dispatch(addHighScoreRequest());
    const response = await axios.post(`${API_URL}/api/leaderboard`, data);
    dispatch(addHighScoreSuccess(response.data));
  } catch (err) {
    dispatch(addHighScoreFailure(err))
  }
}