function Tile(x,y) {
  this.id = `${x}-${y}`;
  this.x = x;
  this.y = y;
  this.value = null;
  this.isMine = false;
  this.isVisible = false;
}

export const initBoard = (size, mineCount) => {
  let board = new Array(size).fill(null)
    .map((row, rowIdx) => new Array(size).fill(null)
      .map((el, colIdx) => new Tile(rowIdx, colIdx)));
  board = placeMines(board, mineCount);
  board = updateBoard(board);
  return board;
}

export const placeMines = (board, mineCount) => {
  const boardClone = board.map(row => row.map(tile => ({ ...tile})));
  const minimum = 0;
  const maximum = board.length - 1;
  const mines = [];

  for (let i = 0; i < mineCount; i++) {
    const x = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    const y = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    mines.push([x, y]);
  }
  mines.forEach(mine => boardClone[mine[0]][mine[1]].isMine = true);

  return boardClone;
}

export const updateBoard = (board) => {
  const boardClone = board.map(row => row.map(tile => ({ ...tile})));
  for (let x = 0; x < boardClone.length; x++) {
    for (let y = 0; y < boardClone.length; y++) {
      if (!boardClone[x][y].isMine) {
        boardClone[x][y].value = getAdjacentTiles(x, y, boardClone).filter(tile => tile && tile.isMine).length
      }
    }
  }

  return boardClone;
}

export const getAdjacentTiles = (x, y, board) => {
  const top = isWithinBoard(x - 1, y, board) ? board[x - 1][y] : null;
  const topRight = isWithinBoard(x - 1, y + 1, board) ? board[x - 1][y + 1] : null;
  const right = isWithinBoard(x, y + 1, board) ? board[x][y + 1] : null;
  const bottomRight = isWithinBoard(x + 1, y + 1, board) ? board[x + 1][y + 1] : null;
  const bottom = isWithinBoard(x + 1, y, board) ? board[x + 1][y] : null;
  const bottomLeft = isWithinBoard(x + 1, y - 1, board) ? board[x + 1][y - 1] : null;
  const left = isWithinBoard(x, y - 1, board) ? board[x][y - 1] : null;
  const topLeft = isWithinBoard(x - 1, y - 1, board) ? board[x - 1][y - 1] : null;

  return [top, topRight, right, bottomRight, bottom, bottomLeft, left, topLeft]
}

export const isWithinBoard = (x, y, board) => {
  return ((x > -1) && (x < board.length) && (y > -1) && (y < board.length));
}

export const revealEmpty = (x, y, board, tilesToReveal = []) => {
  const adjacentTiles = getAdjacentTiles(x, y, board);

  adjacentTiles.forEach(tile => {
    if (tile && !tile.isVisible && tile.value === 0 && !tile.isMine) {
      tilesToReveal.push(tile);
      tile.isVisible = true;
      revealEmpty(tile.x, tile.y, board, tilesToReveal)
    }
    // Check Empty's adjacent
    if (tile && !tile.isVisible && !tile.isMine) {
      tile.isVisible = true;
      tilesToReveal.push(tile);
    }
  })


  return tilesToReveal
}