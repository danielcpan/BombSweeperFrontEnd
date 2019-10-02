import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Container, Grid } from 'semantic-ui-react';
// import Board from '../components/Board';
import Board2 from '../components/Board2';
import * as GameActions from '../actions/gameActions';
import * as BoardActions from '../actions/boardActions';
import GameOverModal from '../components/GameOverModal';
import Timer from '../components/Timer';
import GameDifficultyTabs from '../components/GameDifficultyTabs';
import * as DifficultyTypes from '../constants/difficultyTypes';
import * as DifficultySettings from '../constants/difficultySettingsTypes';

const App = (props) => {
  const {
    minesLeftCount,
  } = props;

  const [gameState, setGameState] = useState({
    rows: 0,
    cols: 0,
    mines: 0,
    score: 0,
    isGameOver: false,
    isWon: false,
  })

  const [time, setTime] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [difficultyType, setDifficultyType] = useState(DifficultyTypes.BEGINNER);
  const savedTimerCallback = useRef();

  const setGameDifficulty = () => {
    console.log('settingGameDifficulty')
    let difficultySettings = null;

    if (difficultyType === DifficultyTypes.BEGINNER) {
      difficultySettings = DifficultySettings.BEGINNER_SETTINGS
    } else if (difficultyType === DifficultyTypes.INTERMEDIATE) {
      difficultySettings = DifficultySettings.INTERMEDIATE_SETTINGS
    } else {
      difficultySettings = DifficultySettings.EXPERT_SETTINGS
    }

    setGameState(prevState => ({ 
      ...prevState, 
      isGameOver: false, 
      isWon: false, 
      score: 0, 
      ...difficultySettings
    }))
  }

  useEffect(() => {
    const callback = () => {
      setTime(time + 1);
    };
    savedTimerCallback.current = callback;
  }, [time]);

  const handleLose = () => {
    setGameState(prevState => ({ ...prevState, isGameOver: true, isWon: false }))
    // updateGameStatus({ isGameOver: true, isWon: false });
    // setIsGameOverLocal(true);
    setIsModalOpen(true);
  };

  const handleWin = () => {
    setGameState(prevState => ({ ...prevState, isGameOver: true, isWon: true }))
    // updateGameStatus({ isGameOver: true, isWon: true });
    setIsModalOpen(true);
  };

  const handleScore = () => {
    // updateGameScore(score + 1);
  };

  const handleGameDifficultyChange = (difficultyType) => {

    // updateGameStatus({ isGameOver: false, isWon: false });
    setDifficultyType(difficultyType);
    // updateGameScore(0);
    setTime(0);
  };

  const handlePlayAgain = () => {
    setGameState(prevState => ({ 
      ...prevState, 
      isGameOver: false, 
      isWon: false, 
      score: 0, 
    }))    
    // setIsGameOverLocal(false);
    // updateGameStatus({ isGameOver: false, isWon: false });
    // updateGameScore(0);
    setTime(0);
    setIsModalOpen(false);
  };

  console.log(gameState)

  useEffect(() => {
    // setGameState(prevState => ({ ...gameState, ...}))
    setGameDifficulty(difficultyType);
  }, [difficultyType]);

  return (
    <div className="App">
      <Container style={{ marginTop: 20 }}>
        <GameDifficultyTabs handleClick={handleGameDifficultyChange} />

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
                {/* <Timer
                  time={time}
                  savedTimerCallback={savedTimerCallback}
                  isGameOver={isGameOver}
                /> */}
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Board2
            rows={gameState.rows}
            cols={gameState.cols}
            handleScore={handleScore}
            mines={gameState.mines}
            isGameOver={gameState.isGameOver}
            isGameOverLocal={isGameOverLocal}
            handleLose={handleLose}
            handleWin={handleWin}
          />
        </Container>
      </Container>
      <GameOverModal
        score={gameState.score}
        isModalOpen={isModalOpen}
        isWon={gameState.isWon}
        time={time}
        difficultyType={difficultyType}
        handlePlayAgain={handlePlayAgain}
      />
    </div>
  );
};

const styles = ({
  flexGrid: {
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  col: {
    width: '50vw',
    marginLeft: 10,
    marginRight: 10,
  },
  scoreCard: {
    margin: 5,
    padding: 5,
    borderColor: 'black',
  },
});

const mapStateToProps = (state) => ({
  rows: state.game.rows,
  cols: state.game.cols,
  mineCount: state.game.mineCount,
  score: state.game.score,
  isGameOver: state.game.isGameOver,
  isWon: state.game.isWon,
  nonMineTilesCount: state.board.nonMineTilesCount,
  minesLeftCount: state.board.minesLeftCount,
});

const mapDispatchToProps = (dispatch) => ({
  // setGameDifficulty: (settings) => dispatch(GameActions.setGameDifficulty(settings)),
  // updateGameScore: (score) => dispatch(GameActions.updateGameScore(score)),
  // updateGameStatus: (status) => dispatch(GameActions.updateGameStatus(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
