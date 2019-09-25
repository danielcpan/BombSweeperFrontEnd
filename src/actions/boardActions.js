import {
  SET_UP_BOARD,
  REVEAL_TILE,
  REVEAL_EMPTY_TILES,
  TOGGLE_FLAG
} from '../constants/actionTypes';
import store from '../store';
import { selectTiles } from '../reducers/boardReducer';

import { initBoard, getAdjacentTiles, revealEmpty } from '../models/Board';

export const setUpBoard = (rows, cols, mineCount) => async dispatch => {
  const board = initBoard(rows, cols, mineCount);
  const tileIds = {};
  const allIds = new Array(rows).fill(null).map(el => []);

  // NORMALIZE DATA
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      const currentTile = board[x][y];
      tileIds[currentTile.id] = currentTile;
      allIds[x].push(currentTile.id)
    }
  }

  dispatch({
    type: SET_UP_BOARD,
    payload: tileIds,
    allIds,
    nonMineTilesCount: (rows * cols) - mineCount,
    minesLeftCount: mineCount
  })
}

export const revealTile = (tileId) => ({
  type: REVEAL_TILE,
  payload: tileId,
})

export const revealEmptyTiles = (tile, board) => async dispatch => {
  const boardClone = board.map(row => row.map(tile => ({ ...tile})));
  const tilesToReveal = revealEmpty(tile.x, tile.y, boardClone);
  const tilesToRevealIds = {}
  tilesToReveal.forEach(tile => tilesToRevealIds[tile.id] = tile);

  dispatch({
    type: REVEAL_EMPTY_TILES,
    payload: tilesToRevealIds
  })
}

export const toggleFlag = tileId => ({
  type: TOGGLE_FLAG,
  payload: tileId,
  
})
