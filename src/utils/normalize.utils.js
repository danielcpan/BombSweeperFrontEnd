export const normalizeBoard = board => {
  if (!board) return;

  const rows = board.length;
  const cols = board[0] ? board[0].length : 0;

  const tileIds = {};
  const allIds = new Array(rows).fill(null).map(el => []);
  
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      const currentTile = board[x][y];
      tileIds[currentTile.id] = currentTile;
      allIds[x].push(currentTile.id)
    }
  }

  return {
    tileIds,
    allIds,
  }
}