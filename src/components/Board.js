import React, { useState, useEffect} from 'react';
import { initBoard } from '../models/Board';

const Board = props => {
  const { size, mineCount, isGameOver, handleIsGameOver, handleScore } = props;
  const [board, setBoard] = useState(initBoard(size, mineCount))

  const handleClick = (tile) => {
    if (isGameOver) return;
    const boardClone = board.map(row => row.slice());

    for (let x = 0; x < boardClone.length; x++) {
      for (let y = 0; y < boardClone.length; y++) {
        const currentTile = boardClone[x][y];
        if (currentTile.id === tile.id) {
          currentTile.isVisible = true;
          if (currentTile.isMine) {
            handleIsGameOver();
          } else {
            handleScore();
          }
        }
      }
    }

    setBoard(boardClone);
  }

  return (
    <div style={styles.board}>
      <table>
        <tbody>
          {board.map((row, rowIdx) => (
            <Row row={row} rowIdx={rowIdx} handleClick={handleClick}/>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const Row = props => {
  const { row, rowIdx, handleClick } = props;

  return (
    <tr key={rowIdx}>
      {row.map(tile => (
        <Tile tile={tile} handleClick={handleClick}/>
      ))}
    </tr>
  )
}

const Tile = props => {
  const { tile, handleClick } = props;



  return (
    <td key={tile.id} onClick={() => handleClick(tile)}>
      {tile.isVisible ? (
        (tile.isMine) ? (
          <div style={{...styles.tile, ...styles.mineTile}}>
            <div style={{ flex: 1}}>
              {(tile.isMine) ? 'mine' : tile.value}
            </div>
          </div>
        ) : (
          <div style={{...styles.tile, ...styles.revealedTile}}>
            <div style={{ flex: 1}}>
              {(tile.isMine) ? 'mine' : tile.value}
            </div>
          </div>
        )
      ) : (
        <div style={{...styles.tile}}>
          <div style={{ flex: 1}}>
            {/* {(tile.isMine) ? 'mine' : tile.value} */}
          </div>
        </div>        
      )}
    </td>
  )
}

const styles = ({
  board: {
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
    height: '100vh'
  },  
  tile:  {
    display: 'flex', 
    backgroundColor: '#59606f',
    alignItems: 'center',
    borderRadius: 5, 
    height: 50, 
    width: 50,     
  },
  mineTile: {
    backgroundColor: 'red',
  },
  revealedTile: {
    backgroundColor: '#b8c0d2'
  }
})

export default Board;
