import React, { useState, useEffect} from 'react';
import './App.css';
import Board from './components/Board';

const App = () => {
  const [size, setSize] = useState(10);
  const [mineCount, setMineCount] = useState(50);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const handleIsGameOver = () => {
    setIsGameOver(true);
  }

  const handleScore = () => {
    setScore(score + 1);
  }

  return (
    <div className="App">
      <div>Mine Sweeper</div>
      <div>Score: {score}</div>
      {(isGameOver) && (
        <div>GAME OVER</div>
      )}
      <Board 
        size={size} 
        handleScore={handleScore}
        mineCount={mineCount} 
        isGameOver={isGameOver} 
        handleIsGameOver={handleIsGameOver} 
      />
    </div>
  );
}

export default App;
