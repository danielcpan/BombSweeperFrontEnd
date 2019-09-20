import {
  SET_UP_BOARD,
  REVEAL_TILE,
  REVEAL_EMPTY_TILES
} from '../constants/actionTypes';

const initialState = {
  byId: {},
  allIds: [],
};

  export default (state = initialState, action) => {
    switch (action.type) {
      case SET_UP_BOARD:
        return { 
          ...state, 
          byId: action.payload,
          allIds: action.allIds
        };
      case REVEAL_TILE:
        const tileId = action.payload;
        return { 
          ...state, 
          byId: { ...state.byId, [tileId]: { ...state.byId[tileId], isVisible: true }},
        };
      case REVEAL_EMPTY_TILES:
          const tilesToRevealIds = action.payload;
          return { 
            ...state, 
            byId: { ...state.byId, ...tilesToRevealIds},
          };
      default:
        return state;
    }
  }

// SELECTORS
export const selectTiles = state => {
  return state.board.allIds.map(row => row.map(id => state.board.byId[id]));
}