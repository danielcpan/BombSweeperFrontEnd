function Tile(x, y) {
  this.id = `${x}-${y}`;
  this.x = x;
  this.y = y;
  this.adjacentMines = 0;
  this.isMine = false;
  this.isFlagged = false;
  this.isRevealed = false;
  this.isRevealed = false;
}

export const initBoard = (rows, cols, mineCount) => {
  console.log('INITING AGAIN')
  let board = new Array(rows).fill(null)
  .map((row, rowIdx) => new Array(cols).fill(null)
    .map((el, colIdx) => new Tile(rowIdx, colIdx)));
  board = placeMines(board, mineCount, rows, cols);
  board = updateBoardWithAdjacents(board, rows, cols);
  return board;
}

export const placeMines = (boardClone, mineCount, rows, cols) => {
  const minimum = 0;
  const maximumX = rows - 1 > 0 ? rows - 1 : 0;
  const maximumY = cols - 1 > 0 ? cols - 1: 0;
  const mines = {};

  for (let i = 0; i < mineCount; i++) {
    const x = Math.floor(Math.random() * (maximumX - minimum + 1)) + minimum;
    const y = Math.floor(Math.random() * (maximumY - minimum + 1)) + minimum;
    const id = `${x}-${y}`;
    !mines[id] ? mines[id] = { x, y } : i--;
  }

  Object.keys(mines).forEach((key) => {
    const { x } = mines[key];
    const { y } = mines[key];
    boardClone[x][y].isMine = true;
  });

  return boardClone;
};

export const updateBoardWithAdjacents = (boardClone, rows, cols) => {
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      if (!boardClone[x][y].isMine) {
        boardClone[x][y].adjacentMines = getAdjacentTiles(x, y, boardClone).filter((tile) => tile && tile.isMine).length;
      }
    }
  }

  return boardClone;
};

export const getAdjacentEmptyTiles = (x, y, board, tilesToReveal = {}) => {
  const adjacentTiles = getAdjacentTiles(x, y, board);

  [...adjacentTiles, board[x,y]].forEach((tile) => {
    if (tile && !tile.isRevealed && tile.adjacentMines === 0 && !tile.isMine && !tile.isFlagged) {
      tilesToReveal[tile.id] = tile;
      tile.isRevealed = true;
      getAdjacentEmptyTiles(tile.x, tile.y, board, tilesToReveal);
    }
    // Check Empty's adjacent
    if (tile && !tile.isRevealed && !tile.isMine && !tile.isFlagged) {
      tile.isRevealed = true;
      tilesToReveal[tile.id] = tile;
    }
  });

  return tilesToReveal;
};

export const getFirstNonMineTile = (board, tile) => {
  for (let x = 0; x < board.length; x++) {
    for (let y = 0; y < board[0].length; y++) {
      const currentTile = board[x][y];
      if (!currentTile.isMine && currentTile.id !== tile.id) {
        return currentTile;
      }
    }
  }

  return -1;
};

// Private Util Functions
const isWithinBoard = (x, y, board) => ((x > -1) && (x < board.length) && (y > -1) && (y < board[0].length));

const getAdjacentTiles = (x, y, board) => {
  const top = isWithinBoard(x - 1, y, board) ? board[x - 1][y] : null;
  const topRight = isWithinBoard(x - 1, y + 1, board) ? board[x - 1][y + 1] : null;
  const right = isWithinBoard(x, y + 1, board) ? board[x][y + 1] : null;
  const bottomRight = isWithinBoard(x + 1, y + 1, board) ? board[x + 1][y + 1] : null;
  const bottom = isWithinBoard(x + 1, y, board) ? board[x + 1][y] : null;
  const bottomLeft = isWithinBoard(x + 1, y - 1, board) ? board[x + 1][y - 1] : null;
  const left = isWithinBoard(x, y - 1, board) ? board[x][y - 1] : null;
  const topLeft = isWithinBoard(x - 1, y - 1, board) ? board[x - 1][y - 1] : null;

  return [top, topRight, right, bottomRight, bottom, bottomLeft, left, topLeft];
};
