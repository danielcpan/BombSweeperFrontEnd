import React from 'react';

const Tile = props => {
  const { tile, handleLeftClick, handleRightClick } = props;

  const getTileValue = tile => {
    if (tile.isFlagged) return '🚩';
    if (!tile.isVisible) return '';
    if (tile.isMine) return '💣';
    if (tile.value === 0) return '';
    return tile.value;
  }

  const getTileStyles = tile => {
    if (tile.isFlagged) return styles.flag;
    if (!tile.isVisible) return;
    if (tile.isMine) return styles.mine;
    return styles.revealedTile;
  }

  const getMineFlagTextStyles = tile => {
    if (tile.isMine) return { paddingLeft: 3};
    if (tile.isFlagged) return { paddingLeft: 5};
  }
  
  return (
    <td 
      onClick={() => handleLeftClick(tile)} 
      onContextMenu={e => handleRightClick(e, tile)}
    >
      <div style={{ ...styles.tile, ...getTileStyles(tile) }}>
        <div style={{ ...styles.tileText, ...getMineFlagTextStyles(tile)}}>
          {getTileValue(tile)}
        </div>
      </div>
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
    height: 25,
    width: 25,
    textAlign: 'center',
    userSelect: 'none'
  },
  mine: {
    backgroundColor: 'red',
  },
  revealedTile: {
    backgroundColor: '#b8c0d2'
  },
  tileText: {
    flex: 1
  },
  flag: {
    backgroundColor: '#9aacd6'
  }
})

export default Tile;