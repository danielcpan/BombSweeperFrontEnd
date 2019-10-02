import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as BoardActions from '../actions/boardActions';
import { selectTiles } from '../reducers/boardReducer';
import Tile from './Tile';
import { initBoard, getAdjacentEmptyTiles } from '../utils/board.utils';

const Board2 = (props) => {
  const {
    rows, 
    cols,
    mines,
    isGameOver,
    handleLose,
    handleScore,
    toggleFlag,
  } = props;

  const [boardData, setBoardData] = useState([[]]);
  const [nonMineTilesCount, setNonMineTilesCount] = useState(0);
  const [minesLeftCount, setMinesLeftCount] = useState(0);

  console.log('blah!')

  const [isFirstClick, setIsFirstClick] = useState(true);
  const [, forceUpdate] = React.useState(0);

  const handleLeftClick = (tile) => {
    if (isGameOver || tile.isRevealed || tile.isFlagged || tile.isVisible) return;

    if (tile.isMine) {
      if (isFirstClick) {
        handleScore();
        // moveMine(board, tile);
      } else {
        revealTile(tile);
        setIsFirstClick(true);
        handleLose();
        return;
      }
    }

    setIsFirstClick(false);
    if (!tile.isRevealed && !tile.isMine) handleScore();

    if (tile.adjacentMines === 0) {
      revealEmptyTiles(tile);
    } else {
      revealTile(tile);
    }
  };

  const showAll = () => {
    console.log('showing all')
    const updatedBoardData = boardData.map((row) => row.map((tile) => ({ ...tile, isVisible: !tile.isVisible })));
    console.log(updatedBoardData)
    setBoardData(updatedBoardData);
  }

  const revealTile = (tile) => {
    const updatedBoardData = boardData.map((row) => row.map((tile) => ({ ...tile })));
    updatedBoardData[tile.x][tile.y].isRevealed = true;

    setBoardData(updatedBoardData);
  }

  const revealEmptyTiles = (tile) => {
    const updatedBoardData = boardData.map((row) => row.map((tile) => ({ ...tile })));
    const tilesToReveal = getAdjacentEmptyTiles(tile.x, tile.y, updatedBoardData);

    setBoardData(updatedBoardData);
    setNonMineTilesCount(prevState => prevState - Object.keys(tilesToReveal).length);
  }

  const handleRightClick = (e, tile) => {
    e.preventDefault();
    if (isGameOver || (tile.isRevealed && !tile.isFlagged)) return;
    toggleFlag(tile.id);
  };

  useEffect(() => {
    if (isGameOver) return;
    setBoardData(initBoard(rows, cols, mines));
    setNonMineTilesCount((rows * cols) - mines);
    setMinesLeftCount(mines);
  }, [rows, cols, mines, isGameOver])

  return (
    <div style={styles.board}>
      <div onClick={showAll}>Show All</div>
      <table 
        onContextMenu={(e) => e.preventDefault()}
        style={{borderSpacing: 0}}
      >
        <tbody>
          {boardData.map((row, rowIdx) => (
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
  );
};

const Row = (props) => {
  const { row, handleLeftClick, handleRightClick } = props;

  return (
    <tr>
      {row.map((tile) => (
        <Tile
          key={tile.id}
          tile={tile}
          handleLeftClick={handleLeftClick}
          handleRightClick={handleRightClick}
        />
      ))}
    </tr>
  );
};

const styles = ({
  board: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = (state) => ({
  board: selectTiles(state),
  nonMineTilesCount: state.board.nonMineTilesCount,
});

const mapDispatchToProps = (dispatch) => ({
  // revealTile: (tileId) => dispatch(BoardActions.revealTile(tileId)),
  // revealEmptyTiles: (tile, board) => dispatch(BoardActions.revealEmptyTiles(tile, board)),
  // toggleFlag: (tileId) => dispatch(BoardActions.toggleFlag(tileId)),
  // moveMine: (board, tile) => dispatch(BoardActions.moveMine(board, tile)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Board2);
