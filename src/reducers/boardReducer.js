import {
  SET_UP_BOARD,
  REVEAL_TILE,
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
          // byId = {...byId, ['9-8']: {...byId['9-8'], isVisible: true}}
          // byId[action.id]: { ...state.byId[action.id], ...action.payload},
        };        
      default:
        return state;
    }
  }

// SELECTORS
export const selectTiles = state => {
  return state.board.allIds.map(row => row.map(id => state.board.byId[id]));
}