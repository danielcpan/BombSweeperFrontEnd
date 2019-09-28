import axios from 'axios';

import {
  FETCH_LEADERBOARD_REQUEST,
  FETCH_LEADERBOARD_SUCCESS,
  FETCH_LEADERBOARD_FAILURE,
} from '../constants/actionTypes';

const env = process.env.NODE_ENV || 'development';
const { API_URL } = require('../config/config')[env];

// FETCH LEADERBOARD ACTIONS
export const fetchRecipesRequest = () => ({
  type: FETCH_LEADERBOARD_REQUEST,
})

export const fetchRecipesSuccess = leaderboard => ({
  type: FETCH_LEADERBOARD_SUCCESS,
  payload: leaderboard,
})

export const fetchRecipesFailure = err => ({
  type: FETCH_LEADERBOARD_FAILURE,
  payload: err,
})

export const fetchLeaderboard = params => async dispatch => {
  try {
    dispatch(fetchRecipesRequest());
    const response = await axios.get(`${API_URL}/api/leaderboard`, { params });

    dispatch(fetchRecipesSuccess(response.data));
  } catch (err) {
    dispatch(fetchRecipesFailure(err));
  }
}