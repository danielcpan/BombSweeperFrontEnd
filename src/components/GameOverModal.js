import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Button, Modal, Transition, Input, Dimmer, Loader,
} from 'semantic-ui-react';
import * as LeaderboardActions from '../actions/leaderboardActions';
import { BEGINNER, INTERMEDIATE, EXPERT } from '../constants/difficultyTypes';

const GameOverModal = (props) => {
  const {
    isLoading, score, isModalOpen, isWon, handlePlayAgain, addHighScore,
  } = props;
  const [formData, setFormData] = useState({
    playerName: '',
  });

  const handleChange = (e) => {
    const val = e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      playerName: val,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const scoreData = {
      ...formData,
      difficulty: EXPERT,
      value: score,
      seconds: 50,
      createdAt: new Date(),
    };
    addHighScore(scoreData);
  };

  const gameStatus = isWon ? 'You Won' : 'Game Over';

  return (
    <Transition visible={isModalOpen} animation="scale" duration={500}>
      <Modal size="mini" basic centered open={isModalOpen} style={{ textAlign: 'center' }}>
        <Modal.Header><h1>{gameStatus}</h1></Modal.Header>
        <Modal.Content>
          <div>
Your Score:
            {score}
          </div>
          <div>Your High Score: N/A</div>
          <div>
            <form onSubmit={handleSubmit}>
              <span>Your Name:</span>
              <Input
                fluid
                onChange={handleChange}
                placeholder="Enter desired username..."
                value={formData.playerName}
              />
            </form>
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button
            basic
            color="red"
            inverted
            content="Submit Score"
            loading={isLoading}
            onClick={handleSubmit}
          />
          <Button
            basic
            color="green"
            inverted
            content="Play Again"
            onClick={() => handlePlayAgain()}
          />
        </Modal.Actions>
      </Modal>
    </Transition>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.leaderboard.isLoading,
  hasErrored: state.leaderboard.hasErrored,
  error: state.leaderboard.error,
});

const mapDispatchToProps = (dispatch) => ({
  addHighScore: (data) => dispatch(LeaderboardActions.addHighScore(data)),
  // setUpBoard: (rows, cols, mineCount) => dispatch(BoardActions.setUpBoard(rows, cols, mineCount)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameOverModal);
