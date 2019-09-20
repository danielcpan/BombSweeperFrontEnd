import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as BoardActions from '../actions/boardActions';
import { selectTiles } from '../reducers/boardReducer';

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
    revealEmptyTiles
  } = props;

  useEffect(() => {
    setUpBoard(size, mineCount)
  }, [])

  const handleClick = (tile) => {
    if (isGameOver) return;
    revealTile(tile.id)
    if (tile.isMine) {
      handleIsGameOver();
    }
    if (!tile.isVisible) {
      handleScore()
    }
    if (tile.value === 0) {
      revealEmptyTiles(tile, board);

    }
    // handleScore()
  }

  return (
    <div style={styles.board}>
      <table>
        <tbody>
          {board.map((row, rowIdx) => (
            <Row 
              key={rowIdx}
              row={row}
              rowIdx={rowIdx} 
              handleClick={handleClick}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

const Row = props => {
  const { row, handleClick } = props;

  return (
    <tr>
      {row.map(tile => (
        <Tile 
          key={tile.id}
          tile={tile} 
          handleClick={handleClick} 
        />
      ))}
    </tr>
  )
}

const Tile = props => {
  const { tile, handleClick } = props;



  return (
    <td onClick={() => handleClick(tile)}>
      {tile.isVisible ? (
        (tile.isMine) ? (
          <div style={{ ...styles.tile, ...styles.mineTile }}>
            <div style={{ flex: 1 }}>
              {(tile.isMine) ? 'mine' : tile.value}
            </div>
          </div>
        ) : (
            <div style={{ ...styles.tile, ...styles.revealedTile }}>
              <div style={{ flex: 1 }}>
                {(tile.value === 0) ? '' : tile.value}
              </div>
            </div>
          )
      ) : (
          <div style={{ ...styles.tile }}>
            <div style={{ flex: 1 }}>
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
  tile: {
    display: 'flex',
    backgroundColor: '#59606f',
    alignItems: 'center',
    borderRadius: 5,
    height: 50,
    width: 50,
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
});

const mapDispatchToProps = dispatch => ({
  setUpBoard: (size, mineCount) => dispatch(BoardActions.setUpBoard(size, mineCount)),
  revealTile: (tileId) => dispatch(BoardActions.revealTile(tileId)),
  revealEmptyTiles: (tile, board) => dispatch(BoardActions.revealEmptyTiles(tile, board))
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);
