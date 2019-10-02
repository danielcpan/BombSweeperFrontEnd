import React, { useState, useEffect } from 'react';
import Tile from './Tile';
import {
  initBoard, getAdjacentEmptyTiles, getFirstNonMineTile, updateBoardWithAdjacents,
} from '../utils/board.utils';

const Board = (props) => {
  const {
    rows,
    cols,
    mines,
    isGameOver,
    isFirstClick,
    nonMineTilesCount,
    minesLeftCount,
    setNonMineTilesCount,
    setMinesLeftCount,
    setIsFirstClick,
    handleLose,
    handleWin,
    handleScore,
  } = props;

  const [boardData, setBoardData] = useState([[]]);

  const handleLeftClick = (tile) => {
    if (isGameOver || tile.isRevealed || tile.isFlagged || tile.isVisible) return;

    if (tile.isMine) {
      if (isFirstClick) {
        handleScore();
        moveMine(tile);
      } else {
        revealTile(tile);
        setIsFirstClick(true);
        handleLose();
        return;
      }
    }

    setIsFirstClick(false);
    if (!tile.isRevealed && !tile.isMine) handleScore();

    tile.adjacentMines === 0 ? revealEmptyTiles(tile) : revealTile(tile);
  };

  const handleRightClick = (e, tile) => {
    e.preventDefault();
    if (isGameOver || (tile.isRevealed && !tile.isFlagged)) return;
    toggleFlag(tile);
  };

  const showAll = () => {
    const updatedBoardData = boardData.map((row) => row.map((tile) => ({ ...tile, isVisible: !tile.isVisible })));
    setBoardData(updatedBoardData);
  };

  const revealTile = (tile) => {
    const updatedBoardData = boardData.map((row) => row.map((tile) => ({ ...tile })));
    updatedBoardData[tile.x][tile.y].isRevealed = true;

    setBoardData(updatedBoardData);
    if (!tile.isMine) setNonMineTilesCount((prevState) => prevState - 1);
  };

  const revealEmptyTiles = (tile) => {
    const updatedBoardData = boardData.map((row) => row.map((tile) => ({ ...tile })));
    const tilesToReveal = getAdjacentEmptyTiles(tile.x, tile.y, updatedBoardData);

    setBoardData(updatedBoardData);
    setNonMineTilesCount((prevState) => prevState - Object.keys(tilesToReveal).length);
  };

  const moveMine = (tile) => {
    let updatedBoardData = boardData.map((row) => row.map((tile) => ({ ...tile })));
    const nonMineTile = getFirstNonMineTile(updatedBoardData, tile);
    boardData[nonMineTile.x][nonMineTile.y].isMine = true;
    boardData[tile.x][tile.y].isMine = false;
    updatedBoardData = updateBoardWithAdjacents(boardData, rows, cols);
    setBoardData(updatedBoardData);
  };

  const toggleFlag = (tile) => {
    const updatedBoardData = boardData.map((row) => row.map((tile) => ({ ...tile })));
    updatedBoardData[tile.x][tile.y].isFlagged = !tile.isFlagged;

    setBoardData(updatedBoardData);
    setMinesLeftCount(!tile.isFlagged ? minesLeftCount - 1 : minesLeftCount + 1);
  };

  useEffect(() => {
    if (!isFirstClick && nonMineTilesCount === 0) handleWin();
  }, [isFirstClick, nonMineTilesCount, handleWin]);

  useEffect(() => {
    if (isGameOver) return;
    setBoardData(initBoard(rows, cols, mines));
    setNonMineTilesCount((rows * cols) - mines);
    setMinesLeftCount(mines);
  }, [rows, cols, mines, isGameOver, setNonMineTilesCount, setMinesLeftCount]);

  console.log('board')
  return (
    <div style={styles.board}>
      {process.env.NODE_ENV === 'development' && (
        <div onClick={showAll}>Show All</div>
      )}
      <table
        onContextMenu={(e) => e.preventDefault()}
        style={{ borderSpacing: 0 }}
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
