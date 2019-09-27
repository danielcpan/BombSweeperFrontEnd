import {
  SET_UP_BOARD,
  REVEAL_TILE,
  REVEAL_EMPTY_TILES,
  TOGGLE_FLAG
} from '../constants/actionTypes';
import { normalize } from 'normalizr';
import * as schema from '../schema';
import store from '../store';
import { selectTiles } from '../reducers/boardReducer';
import { normalizeBoard } from '../utils/normalize.utils';

import { initBoard, getAdjacentTiles, revealEmpty, updateBoard, placeMines } from '../models/Board';

export const setUpBoard = (rows, cols, mineCount) => async dispatch => {
  const board = initBoard(rows, cols, mineCount);
  const { tileIds, allIds } = normalizeBoard(board)

  dispatch({
    type: SET_UP_BOARD,
    payload: tileIds,
    allIds,
    nonMineTilesCount: (rows * cols) - mineCount,
    minesLeftCount: mineCount
  })
}

export const placeMinesTest = (board, mineCount) => dispatch => {;
  // let boardClone = board.map(row => row.map(tile => ({ ...tile})));
  // boardClone = placeMines(boardClone, mineCount);
  let boardClone = placeMines(board, mineCount);
  boardClone = updateBoard(boardClone);
  const { tileIds, allIds } = normalizeBoard(boardClone)

  dispatch({
    type: 'UPDATE_BOARD',
    payload: tileIds,
    allIds
  })
}

export const updateBoardTest = (board) => dispatch => {
  // let boardClone = board.map(row => row.map(tile => ({ ...tile})));
  // boardClone = updateBoard(boardClone);
  const boardClone = updateBoard(board);
  const { tileIds, allIds } = normalizeBoard(boardClone)

  dispatch({
    type: 'UPDATE_BOARD',
    payload: tileIds,
    allIds
  })  
}

export const revealTile = tileId => ({
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

export const moveMine = (board, tile) => async dispatch => {
  let boardClone = board.map(row => row.map(tile => ({ ...tile})));
  // tile.isMine = false;
  const nonMineTile = getFirstNonMineTile(boardClone);
  nonMineTile.isMine = true;
  boardClone[tile.id[0]][tile.id[tile.id.length-1]].isMine = false;
  boardClone = updateBoard(boardClone);


  // tile.isMine = false;

  // const boardClone = updateBoard(board);
  const { tileIds, allIds } = normalizeBoard(boardClone)  

    dispatch({
      type: 'UPDATE_BOARD',
      payload: tileIds,
      allIds
    })

}


const getFirstNonMineTile = (board) => {
  for (let x = 0; x < board.length; x++) {
    for (let y = 0; y < board[0].length; y++) {
      const currentTile = board[x][y]
      if (!currentTile.isMine) {
        return currentTile
      }
    }
  }

  return -1;
}