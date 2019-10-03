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

- Main Frontend Framework: Reactjs
- State Management: Redux
- Style Framework: Semantic UI React

#### GamePlay

![ShortenUrl](https://user-images.githubusercontent.com/20826907/63155035-b275b880-bfc6-11e9-8df8-5b07e69e7a81.gif)

#### Leaderboard

![UseShortenedUrl](https://user-images.githubusercontent.com/20826907/63155036-b275b880-bfc6-11e9-8a34-e2d01164a3e7.gif)

#### Secret Cheat Code

![](https://user-images.githubusercontent.com/20826907/63155037-b275b880-bfc6-11e9-9da8-dbdbe5858516.gif)

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