function Game(size) {
  this.size = size;
  this.board = initBoard(size);

  function initBoard(size) {
    return new Array(size).fill(null).map(row => new Array(size).fill(null).map(el => null))
  }
}

Game.prototype.placeMines = function () {
  const minimum = 0;
  const maximum = this.size - 1;
  const mines = [];
  for (let i = 0; i < this.size; i++) {
    const x = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    const y = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    mines.push([x, y]);
  }

  mines.forEach(mine => this.board[mine[0]][mine[1]] = 'mine');
}

Game.prototype.updateBoard = function () {
  for (let x = 0; x < this.size; x++) {
    for (let y = 0; y < this.size; y++) {
      if (this.board[x][y] !== 'mine') {
        this.board[x][y] = this.getAdjacentTiles(x,y).filter(el => el === 'mine').length
      }
    }
  }
}

Game.prototype.getAdjacentTiles = function (x, y) {
  const top = this.isWithinBoard(x - 1, y) ? this.board[x - 1][y] : null;
  const topRight = this.isWithinBoard(x - 1, y + 1) ? this.board[x - 1][y + 1] : null;
  const right = this.isWithinBoard(x, y + 1) ? this.board[x][y + 1] : null;
  const bottomRight = this.isWithinBoard(x + 1, y + 1) ? this.board[x + 1][y + 1] : null;
  const bottom = this.isWithinBoard(x + 1, y) ? this.board[x + 1][y] : null;
  const bottomLeft = this.isWithinBoard(x + 1, y - 1) ? this.board[x + 1][y - 1] : null;
  const left = this.isWithinBoard(x, y - 1) ? this.board[x][y - 1] : null;
  const topLeft = this.isWithinBoard(x - 1, y - 1) ? this.board[x - 1][y - 1] : null;

  return [top, topRight, right, bottomRight, bottom, bottomLeft, left, topLeft]
}

Game.prototype.isWithinBoard = function (x, y) {
  return ((x > -1) && (x < this.size) && (y > -1) && (y < this.size));
}

Game.prototype.printBoard = function() {
  for (let x = 0; x < this.size; x++) {
    let row = ''
    for (let y = 0; y < this.size; y++) {
      const currentTile = this.board[x][y];
      if (currentTile) {
        row += currentTile.toString().padEnd(10, ' ')  
      } else {
        row += 'null'.padEnd(10, ' ')
      }
    }
    console.log(row);
  }
}

// const myGame = new Game(10);
// // console.log(myGame.board);
// myGame.placeMines();
// console.log(myGame.printBoard());
// myGame.updateBoard();
// console.log(myGame.printBoard());

export default Game;
