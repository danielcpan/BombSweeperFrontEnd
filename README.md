**Mine Sweeper Clone, features a leaderboard**  

Check out the app! https://bombsweeper.netlify.com

## Bomb Sweeper uses the following technologies:

### BackEnd: 

- Engine: Nodejs
- Server:  Express
- ORM: Mongoose
- Database: MongoDb
- REST
- Test Frameworks: Mocha + Chai

### FrontEnd: 

- Main Frontend Framework: Reactjs + React Hooks
- State Management: Redux
- Style Framework: Semantic UI React

#### GamePlay

![BombSweeperGameplay](https://user-images.githubusercontent.com/20826907/66105691-f02ba200-e570-11e9-8c09-8138733326b7.gif)

#### Leaderboard

![BombSweeperLeaderBoard](https://user-images.githubusercontent.com/20826907/66105556-a04cdb00-e570-11e9-974a-d78953d260ef.gif)

#### Empty Reveal Logic

```javascript
export const getAdjacentEmptyTiles = (x, y, board, tilesToReveal = {}) => {
  const adjacentTiles = getAdjacentTiles(x, y, board);

  [...adjacentTiles, board[x][y]].forEach((tile) => {
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
```

Essentially a floodfill algorithm approach in finding adjacent empty tiles. Modified slightly to replicate the behavior of the actual mine sweeper game.
