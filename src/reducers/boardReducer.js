import {
  UPDATE_BOARD,
  SET_UP_BOARD,
  REVEAL_TILE,
  REVEAL_EMPTY_TILES,
  TOGGLE_FLAG,
} from '../constants/actionTypes';

const initialState = {
  byId: {},
  allIds: [],
  nonMineTilesCount: 0,
  minesLeftCount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_BOARD:
      return {
        ...state,
        byId: action.payload,
        allIds: action.allIds,
      };
    case SET_UP_BOARD:
      return {
        ...state,
        byId: action.payload,
        allIds: action.allIds,
        nonMineTilesCount: action.nonMineTilesCount,
        minesLeftCount: action.minesLeftCount,
      };
    case REVEAL_TILE:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload]: { ...state.byId[action.payload], isVisible: true },
        },
        nonMineTilesCount: state.byId[action.payload].isMine ? state.nonMineTilesCount : state.nonMineTilesCount - 1,
      };
    case REVEAL_EMPTY_TILES:
      const tilesToRevealIds = action.payload;
      return {
        ...state,
        byId: { ...state.byId, ...tilesToRevealIds },
        nonMineTilesCount: state.nonMineTilesCount - Object.keys(tilesToRevealIds).length,
      };
    case TOGGLE_FLAG:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload]: {
            ...state.byId[action.payload],
            isFlagged: !state.byId[action.payload].isFlagged,
          },
        },
        minesLeftCount: state.byId[action.payload].isFlagged ? state.minesLeftCount + 1 : state.minesLeftCount - 1,
      };
    default:
      return state;
  }
};

// SELECTORS
export const selectTiles = (state) => state.board.allIds.map((row) => row.map((id) => state.board.byId[id]));
