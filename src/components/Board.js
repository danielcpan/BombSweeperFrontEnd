import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as BoardActions from '../actions/boardActions';
import { selectTiles } from '../reducers/boardReducer';
import Tile from './Tile';

const Board = props => {
  const { 
    board, 
    size, 
    mineCount, 
    isGameOver, 
    handleIsGameOver, 
    handleScore, 
    setUpBoard,
    revealTile,
    revealEmptyTiles,
    toggleFlag
  } = props;

  useEffect(() => {
    setUpBoard(size, mineCount)
  }, [])

  const handleLeftClick = tile => {
    if (isGameOver || tile.isVisible || tile.isFlagged) return;
    revealTile(tile.id)
    if (tile.isMine) handleIsGameOver();
    if (!tile.isVisible && !tile.isMine) handleScore();
    // tile is empty
    if (tile.value === 0) revealEmptyTiles(tile, board);
  }

  const handleRightClick = (e, tile) => {
    e.preventDefault();
    if (isGameOver || (tile.isVisible && !tile.isFlagged)) return;
    toggleFlag(tile.id);
  }  


  return (
    <div style={styles.board}>
      <table onContextMenu={e => e.preventDefault()}>
        <tbody>
          {board.map((row, rowIdx) => (
            <Row 
              key={rowIdx}
              row={row}
              rowIdx={rowIdx} 
              handleLeftClick={handleLeftClick}
              handleRightClick={handleRightClick}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

const Row = props => {
  const { row, handleLeftClick, handleRightClick } = props;

  return (
    <tr>
      {row.map(tile => (
        <Tile 
          key={tile.id}
          tile={tile} 
          handleLeftClick={handleLeftClick} 
          handleRightClick={handleRightClick}
        />
      ))}
    </tr>
  )
}

// const Tile = props => {
//   const { tile, handleLeftClick, handleRightClick } = props;
  
//   return (
//     <td onClick={() => handleLeftClick(tile)} onContextMenu={(e) => handleRightClick(e, tile)}>
//       {tile.isVisible ? (
//         (tile.isMine) ? (
//           <div style={{ ...styles.tile, ...styles.mineTile }}>
//             <div style={{ flex: 1 }}>
//               {(tile.isMine) ? 'mine' : tile.value}
//             </div>
//           </div>
//         ) : (
//             <div style={{ ...styles.tile, ...styles.revealedTile }}>
//               <div style={{ flex: 1 }}>
//                 {(tile.value === 0) ? '' : tile.value}
//               </div>
//             </div>
//           )
//       ) : (
//           <div style={{ ...styles.tile }}>
//             <div style={{ flex: 1 }}>
//               {/* {(tile.isMine) ? 'mine' : tile.value} */}
//             </div>
//           </div>
//         )}
//     </td>
//   )
// }

const styles = ({
  board: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // height: '100vh'
  },
  tile: {
    display: 'flex',
    backgroundColor: '#59606f',
    alignItems: 'center',
    borderRadius: 5,
    height: 25,
    width: 25,
    textAlign: 'center'
  },
  mineTile: {
    backgroundColor: 'red',
  },
  revealedTile: {
    backgroundColor: '#b8c0d2'
  }
})

const mapStateToProps = state => ({
  board: selectTiles(state),
  nonMineTilesCount: state.board.nonMineTilesCount,
});

const mapDispatchToProps = dispatch => ({
  setUpBoard: (size, mineCount) => dispatch(BoardActions.setUpBoard(size, mineCount)),
  revealTile: (tileId) => dispatch(BoardActions.revealTile(tileId)),
  revealEmptyTiles: (tile, board) => dispatch(BoardActions.revealEmptyTiles(tile, board)),
  toggleFlag: tileId => dispatch(BoardActions.toggleFlag(tileId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);
