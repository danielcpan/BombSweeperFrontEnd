import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as BoardActions from '../actions/boardActions';
import { selectTiles } from '../reducers/boardReducer';
import Tile from './Tile';

const Board = props => {
  const { 
    board, 
    isGameOver, 
    handleIsGameOver, 
    handleScore, 
    revealTile,
    revealEmptyTiles,
    toggleFlag,
    placeMinesTest,
    updateBoardTest,
    moveMine
  } = props;

  const [isFirstClick, setIsFirstClick] = React.useState(true);

  const handleLeftClick = tile => {
    // if (!isFirstClick) {
    //   console.log("here!")
    //   placeMinesTest(board, 10);
    //   // updateBoardTest(board)
    //   revealTile(tile.id);
    //   setIsFirstClick(true);
    //   return;
    // };
    if (isGameOver || tile.isVisible || tile.isFlagged) return;
    // revealTile(tile.id)
    if (tile.isMine) {
      if (isFirstClick) {
        moveMine(board, tile);
        setIsFirstClick(false);
        console.log("first Click!")
      } else {
        handleIsGameOver()
        setIsFirstClick(true);
      }
    };
    if (!tile.isVisible && !tile.isMine) handleScore();
    // tile is empty
    if (tile.value === 0) {
      revealEmptyTiles(tile, board);
    } else {
      revealTile(tile.id)
    }
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

const styles = ({
  board: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

const mapStateToProps = state => ({
  board: selectTiles(state),
  nonMineTilesCount: state.board.nonMineTilesCount,
});

const mapDispatchToProps = dispatch => ({
  revealTile: (tileId) => dispatch(BoardActions.revealTile(tileId)),
  revealEmptyTiles: (tile, board) => dispatch(BoardActions.revealEmptyTiles(tile, board)),
  toggleFlag: tileId => dispatch(BoardActions.toggleFlag(tileId)),
  placeMinesTest: (board, mineCount) => dispatch(BoardActions.placeMinesTest(board, mineCount)),
  updateBoardTest: board => dispatch(BoardActions.updateBoardTest(board)),
  moveMine: (board, tile) => dispatch(BoardActions.moveMine(board,tile)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);
