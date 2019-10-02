import React, { useState, useEffect } from 'react';
import Tile from './Tile';
import { initBoard, getAdjacentEmptyTiles } from '../utils/board.utils';

const Board = (props) => {
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

  const [isFirstClick, setIsFirstClick] = useState(true);
  const [, forceUpdate] = React.useState(0);

  const handleLeftClick = (tile) => {
    if (isGameOver || tile.isRevealed || tile.isFlagged || tile.isVisible) return;

    if (tile.isMine) {
      if (isFirstClick) {
        handleScore();
        console.log('SUPPOSEED TO MOVE MINE!')
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
    const updatedBoardData = boardData.map((row) => row.map((tile) => ({ ...tile, isVisible: !tile.isVisible })));
    setBoardData(updatedBoardData);
  }

  const revealTile = (tile) => {
    console.log('reavling tile')
    console.log(tile)
    const updatedBoardData = boardData.map((row) => row.map((tile) => ({ ...tile })));
    updatedBoardData[tile.x][tile.y].isRevealed = true;

    setBoardData(updatedBoardData);
  }

  const revealEmptyTiles = (tile) => {
    console.log('revealing empty tiles')
    console.log(tile)
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

export default Board;
