import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as BoardActions from '../actions/boardActions';
import { selectTiles } from '../reducers/boardReducer';
import Tile from './Tile';

const Board = props => {
  const { 
    board, 
    isGameOver, 
    handleLose, 
    handleWin,
    handleScore, 
    revealTile,
    revealEmptyTiles,
    toggleFlag,
    moveMine,
    nonMineTilesCount
  } = props;

  const [isFirstClick, setIsFirstClick] = useState(true);

  const handleLeftClick = tile => {
    if (isGameOver || tile.isVisible || tile.isFlagged) return;

    if (tile.isMine) {
      if (isFirstClick) {
        handleScore()
        moveMine(board, tile);
      } else {
        revealTile(tile.id)
        setIsFirstClick(true);
        handleLose();
        return;
      }
    };

    setIsFirstClick(false);
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

  useEffect(() => {
    if (!isFirstClick && nonMineTilesCount === 0) {
      setIsFirstClick(true);
      handleWin();
    }
  }, [isFirstClick, nonMineTilesCount, handleWin])


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
  moveMine: (board, tile) => dispatch(BoardActions.moveMine(board,tile)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);
