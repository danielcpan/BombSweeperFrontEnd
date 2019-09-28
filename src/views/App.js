import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Button, Container, Grid } from 'semantic-ui-react'
import Board from '../components/Board';
import * as GameActions from '../actions/gameActions';
import * as BoardActions from '../actions/boardActions';
import GameOverModal from '../components/GameOverModal';
import Timer from '../components/Timer';
import { BEGINNER, INTERMEDIATE, EXPERT } from '../constants/gameTypes';

const App = props => {
  const {
    rows,
    cols,
    mineCount,
    score,
    isGameOver,
    isWon,
    updateGameStatus,
    updateGameScore,
    setGameDifficulty,
    minesLeftCount,
    setUpBoard
  } = props;

  const [time, setTime] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [difficulty, setDifficulty] = useState(BEGINNER);
  const savedTimerCallback = useRef();

  useEffect(() => {
    const callback = () => {
      setTime(time + 1);
    } 
    savedTimerCallback.current = callback;
  }, [time])

  // const handleIsGameOver = () => {
  //   updateGameStatus({ isGameOver: true });
  // }

  const handleLose = () => {
    updateGameStatus({ isGameOver: true, isWon: false });
    setIsModalOpen(true);
  }

  const handleWin = () => {
    updateGameStatus({ isGameOver: true, isWon: true });
    setIsModalOpen(true);
  }

  const handleScore = () => {
    updateGameScore(score + 1);
  }

  const handleSubmitScore = () => {

  }

  const handleGameDifficultyChange = difficulty => {
    updateGameStatus({ isGameOver: false, isWon: false });
    setDifficulty(difficulty);
    updateGameScore(0);
    setTime(0);
  }

  const handlePlayAgain = () => {
    updateGameStatus({ isGameOver: false, isWon: false });
    setUpBoard(rows, cols, mineCount);
    updateGameScore(0);
    setTime(0);
    setIsModalOpen(false);
  }

  useEffect(() => {
    setGameDifficulty(difficulty)
    setUpBoard(rows, cols, mineCount);
  }, [rows, cols, mineCount, difficulty, setGameDifficulty, setUpBoard])

  return (
    <div className="App">
      <Container>
        <Grid.Column style={{marginTop: 10}}>
          <Button 
            active={difficulty === BEGINNER} 
            onClick={() => handleGameDifficultyChange(BEGINNER)}
            content='Beginner'
          />
          <Button 
            active={difficulty === INTERMEDIATE} 
            onClick={() => handleGameDifficultyChange(INTERMEDIATE)}
            content='Intermediate'
          />
          <Button 
            active={difficulty === EXPERT} 
            onClick={ () => handleGameDifficultyChange(EXPERT)}
            content='Expert'
          />
        </Grid.Column>
        
        <Container textAlign='center' style={{ marginTop: 10}}>
          <Grid relaxed>
            <Grid.Row>
              <Grid.Column width={4}>
                <div>Mines Left: {minesLeftCount}</div>
              </Grid.Column>
              <Grid.Column width={8}>
                <div>Score: {score}</div>
              </Grid.Column>
              <Grid.Column width={4}>
                <Timer 
                  time={time} 
                  savedTimerCallback={savedTimerCallback}
                  isGameOver={isGameOver}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Board
            rows={rows}
            cols={cols}
            handleScore={handleScore}
            mineCount={mineCount}
            isGameOver={isGameOver}
            handleLose={handleLose}
            handleWin={handleWin}
          />
        </Container>
      </Container>
      <GameOverModal 
        score={score}
        isModalOpen={isModalOpen}
        isWon={isWon}
        handlePlayAgain={handlePlayAgain}
      />
    </div>
  );
}

const styles = ({
  flexGrid: {
    display: 'flex',
    justifyContent: 'space-evenly'
  },
  col: {
    width: '50vw',
    marginLeft: 10,
    marginRight: 10,
  },
  scoreCard: {
    margin: 5,
    padding: 5,
    borderColor: 'black'
  }
})

const mapStateToProps = state => ({
  rows: state.game.rows,
  cols: state.game.cols,
  mineCount: state.game.mineCount,
  score: state.game.score,
  isGameOver: state.game.isGameOver,
  isWon: state.game.isWon,
  nonMineTilesCount: state.board.nonMineTilesCount,
  minesLeftCount: state.board.minesLeftCount,
});

const mapDispatchToProps = dispatch => ({
  setUpBoard: (rows, cols, mineCount) => dispatch(BoardActions.setUpBoard(rows, cols, mineCount)),
  setGameDifficulty: settings => dispatch(GameActions.setGameDifficulty(settings)),
  updateGameScore: score => dispatch(GameActions.updateGameScore(score)),
  updateGameStatus: status => dispatch(GameActions.updateGameStatus(status))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
