import React from 'react';
import { connect } from 'react-redux';
import { Button, Container, Divider, Grid, Header, Image, Menu, Segment } from 'semantic-ui-react'
import Board from './components/Board';
import * as GameActions from './actions/gameActions';
import DefaultLayout from './components/DefaultLayout';

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
    size,
    mineCount,
    score,
    isGameOver,
    updateGameStatus,
    updateGameScore,
    nonMineTilesCount,
    minesLeftCount
  } = props;

  const handleIsGameOver = () => {
    updateGameStatus({ isGameOver: true });
  }

  const handleScore = () => {
    updateGameScore(score + 1);
  }

  return (
    <div className="App">
      <DefaultLayout>
        <Container>
          <Grid.Column style={{marginTop: 10}}>
            <Button>Beginner</Button>
            <Button primary>Intermediate</Button>
            <Button secondary>Expert</Button>
          </Grid.Column>
          
          <Container textAlign='center' style={{ marginTop: 10}}>
            <Grid relaxed>
              <Grid.Row>
                <Grid.Column width={4}>
                  <div>Mines Left: </div>
                </Grid.Column>
                <Grid.Column width={8}>
                  <div>Score: </div>
                </Grid.Column>
                <Grid.Column width={4}>
                  <div>Time: </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Board
              size={size}
              handleScore={handleScore}
              mineCount={mineCount}
              isGameOver={isGameOver}
              handleIsGameOver={handleIsGameOver}
            />
          </Container>
          
        </Container>
      </DefaultLayout>
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
  size: state.game.size,
  mineCount: state.game.mineCount,
  score: state.game.score,
  isGameOver: state.game.isGameOver,
  nonMineTilesCount: state.board.nonMineTilesCount,
  minesLeftCount: state.board.minesLeftCount,

});

const mapDispatchToProps = dispatch => ({
  updateGameSettings: settings => dispatch(GameActions.updateGameSettings(settings)),
  updateGameScore: score => dispatch(GameActions.updateGameScore(score)),
  updateGameStatus: status => dispatch(GameActions.updateGameStatus(status))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
