import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Container, Divider, Grid, Header, Image, Menu, Segment } from 'semantic-ui-react'
import Board from './components/Board';
import * as GameActions from './actions/gameActions';
import * as BoardActions from './actions/boardActions';
import DefaultLayout from './components/DefaultLayout';
import GameOverModal from './components/GameOverModal';
import { BEGINNER, INTERMEDIATE, EXPERT } from './constants/gameTypes';

const leaderboard = [
  { player: 'TestPlayer1', time: 0.5, date: '18 September 2019'},
  { player: 'TestPlayer2', time: 0.75, date: '18 September 2018'},
  { player: 'TestPlayer3', time: 0.95, date: '18 September 2019'},
  { player: 'TestPlayer4', time: 1.05, date: '18 September 2019'},
  { player: 'TestPlayer5', time: 1.15, date: '18 September 2019'},
  { player: 'TestPlayer6', time: 1.19, date: '18 September 2019'},
]

const App = props => {
  const {
    rows,
    cols,
    mineCount,
    score,
    isGameOver,
    updateGameStatus,
    updateGameScore,
    updateGameSettings,
    nonMineTilesCount,
    minesLeftCount,
    setUpBoard
  } = props;

  const handleIsGameOver = () => {
    updateGameStatus({ isGameOver: true });
  }

  const handleScore = () => {
    updateGameScore(score + 1);
  }

  const handleSubmitScore = () => {

  }

  // const handleGameSettings = settings => {
  //   updateGameSettings(settings)
  // }

  const handlePlayAgain = () => {
    updateGameStatus({ isGameOver: false });
    setUpBoard(rows, cols, mineCount)
  }

  useEffect(() => {
    // updateGameSettings(INTERMEDIATE)
    setUpBoard(rows, cols, mineCount);
  }, [])

  return (
    <div className="App">
      <DefaultLayout>
        <Container>
          <Grid.Column style={{marginTop: 10}}>
            <Button onClick={() => updateGameSettings(BEGINNER)}>Beginner</Button>
            <Button primary onClick={() => updateGameSettings(INTERMEDIATE)}>Intermediate</Button>
            <Button secondary onClick={() => updateGameSettings(EXPERT)}>Expert</Button>
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
                  <div>Time: </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Board
              rows={rows}
              cols={cols}
              handleScore={handleScore}
              mineCount={mineCount}
              isGameOver={isGameOver}
              handleIsGameOver={handleIsGameOver}
            />
          </Container>
        </Container>
      </DefaultLayout>
      <GameOverModal 
      isGameOver={isGameOver} 
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
  nonMineTilesCount: state.board.nonMineTilesCount,
  minesLeftCount: state.board.minesLeftCount,
});

const mapDispatchToProps = dispatch => ({
  setUpBoard: (rows, cols, mineCount) => dispatch(BoardActions.setUpBoard(rows, cols, mineCount)),
  updateGameSettings: settings => dispatch(GameActions.updateGameSettings(settings)),
  updateGameScore: score => dispatch(GameActions.updateGameScore(score)),
  updateGameStatus: status => dispatch(GameActions.updateGameStatus(status))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
