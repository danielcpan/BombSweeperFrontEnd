import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Container, Grid } from 'semantic-ui-react';
import * as DifficultyTypes from '../constants/difficultyTypes';
import * as DifficultySettings from '../constants/difficultySettingsTypes';

import GameDifficultyTabs from '../components/GameDifficultyTabs';
import Board from '../components/Board';
import GameOverModal from '../components/GameOverModal';
import Timer from '../components/Timer';

const App = (props) => {
  const { difficultyType } = props;

  const [gameState, setGameState] = useState({
    rows: 0,
    cols: 0,
    mines: 0,
    score: 0,
    clicks: 0,
    time: 0,
    isGameOver: false,
    isWon: false,
  });

  const [isFirstClick, setIsFirstClick] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nonMineTilesCount, setNonMineTilesCount] = useState(null);
  const [minesLeftCount, setMinesLeftCount] = useState(null);
  const savedTimerCallback = useRef();

  const handleLose = () => {
    setGameState((prevState) => ({ ...prevState, isGameOver: true, isWon: false }));
    setIsModalOpen(true);
  };

  const handleWin = () => {
    setGameState((prevState) => ({ ...prevState, isGameOver: true, isWon: true }));
    setIsModalOpen(true);
  };

  const handleScore = () => {
    const updatedScore = (gameState.clicks + 1) * gameState.time + 1;
    setGameState((prevState) => ({ ...prevState, score: updatedScore, clicks: prevState.clicks + 1 }));
  };

  const handlePlayAgain = () => {
    setGameState((prevState) => ({
      ...prevState,
      isGameOver: false,
      isWon: false,
      score: 0,
      time: 0,
      clicks: 0,
    }));
    setIsFirstClick(true);
    setIsModalOpen(false);
  };

  useEffect(() => {
    const setGameDifficulty = () => {
      let difficultySettings = null;

      if (difficultyType === DifficultyTypes.BEGINNER) {
        difficultySettings = DifficultySettings.BEGINNER_SETTINGS;
      } else if (difficultyType === DifficultyTypes.INTERMEDIATE) {
        difficultySettings = DifficultySettings.INTERMEDIATE_SETTINGS;
      } else {
        difficultySettings = DifficultySettings.EXPERT_SETTINGS;
      }

      setGameState((prevState) => ({
        ...prevState,
        isGameOver: false,
        isWon: false,
        score: 0,
        time: 0,
        clicks: 0,
        ...difficultySettings,
      }));
    };

    setGameDifficulty(difficultyType);
  }, [difficultyType]);

  useEffect(() => {
    const callback = () => {
      setGameState((prevState) => ({ ...prevState, time: prevState.time + 1 }));
    };
    savedTimerCallback.current = callback;
  }, [gameState.time]);

  return (
    <div className="App">
      <Container style={{ marginTop: 20 }}>
        <GameDifficultyTabs />

        <Container textAlign="center" style={{ marginTop: 10 }}>
          <Grid relaxed>
            <Grid.Row>
              <Grid.Column width={4}>
                <div>{`Mines Left: ${minesLeftCount}`}</div>
              </Grid.Column>
              <Grid.Column width={8}>
                <div>{`Score: ${gameState.score}`}</div>
              </Grid.Column>
              <Grid.Column width={4}>
                <Timer
                  time={gameState.time}
                  isFirstClick={isFirstClick}
                  savedTimerCallback={savedTimerCallback}
                  isGameOver={gameState.isGameOver}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Board
            rows={gameState.rows}
            cols={gameState.cols}
            handleScore={handleScore}
            mines={gameState.mines}
            isGameOver={gameState.isGameOver}
            isFirstClick={isFirstClick}
            nonMineTilesCount={nonMineTilesCount}
            setNonMineTilesCount={setNonMineTilesCount}
            setMinesLeftCount={setMinesLeftCount}
            minesLeftCount={minesLeftCount}
            setIsFirstClick={setIsFirstClick}
            handleLose={handleLose}
            handleWin={handleWin}
          />
        </Container>
      </Container>
      <GameOverModal
        clicks={gameState.clicks}
        score={gameState.score}
        isModalOpen={isModalOpen}
        isWon={gameState.isWon}
        time={gameState.time}
        difficultyType={difficultyType}
        handlePlayAgain={handlePlayAgain}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  difficultyType: state.game.difficultyType,
});

export default connect(mapStateToProps)(App);
