import {
  SET_UP_BOARD,
  REVEAL_TILE
} from '../constants/actionTypes';
import { initBoard } from '../models/Board';

export const setUpBoard = (size, mineCount) => async dispatch => {
  const board = initBoard(size, mineCount);
  const tileIds = {};
  const allIds = new Array(size).fill(null).map(el => []);

  // NORMALIZE DATA
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      const currentTile = board[x][y];
      tileIds[currentTile.id] = currentTile;
      allIds[x].push(currentTile.id)
    }
  }

  dispatch({
    type: SET_UP_BOARD,
    payload: tileIds,
    allIds
  })
}

export const revealTile = (tileId) => ({
  type: REVEAL_TILE,
  payload: tileId,
})
