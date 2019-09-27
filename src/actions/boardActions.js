import {
  SET_UP_BOARD,
  REVEAL_TILE,
  REVEAL_EMPTY_TILES,
  TOGGLE_FLAG
} from '../constants/actionTypes';
import { normalizeBoard } from '../utils/normalize.utils';

import { initBoard, getAdjacentEmptyTiles, placeMines, updateBoardWithAdjacents, getFirstNonMineTile } from '../utils/board.utils';

export const setUpBoard = (rows, cols, mineCount) => async dispatch => {
  let board = initBoard(rows, cols, mineCount);
  board = placeMines(board, mineCount);
  board = updateBoardWithAdjacents(board);
  const { tileIds, allIds } = normalizeBoard(board)

  dispatch({
    type: SET_UP_BOARD,
    payload: tileIds,
    allIds,
    nonMineTilesCount: (rows * cols) - mineCount,
    minesLeftCount: mineCount
  })
}

export const revealTile = tileId => ({
  type: REVEAL_TILE,
  payload: tileId,
})

export const revealEmptyTiles = (tile, board) => async dispatch => {
  const boardClone = board.map(row => row.map(tile => ({ ...tile})));
  const tilesToRevealIds = getAdjacentEmptyTiles(tile.x, tile.y, boardClone);

  dispatch({
    type: REVEAL_EMPTY_TILES,
    payload: tilesToRevealIds
  })
}

export const toggleFlag = tileId => ({
  type: TOGGLE_FLAG,
  payload: tileId,
})

export const moveMine = (board, tile) => async dispatch => {
  let boardClone = board.map(row => row.map(tile => ({ ...tile})));
  const nonMineTile = getFirstNonMineTile(boardClone);
  nonMineTile.isMine = true;
  boardClone[tile.id[0]][tile.id[tile.id.length-1]].isMine = false;
  boardClone = updateBoardWithAdjacents(boardClone);

  const { tileIds, allIds } = normalizeBoard(boardClone)  

    dispatch({
      type: 'UPDATE_BOARD',
      payload: tileIds,
      allIds
    })

}
