import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Button, Modal, Transition, Input,
} from 'semantic-ui-react';
import * as LeaderboardActions from '../actions/leaderboardActions';
import ErrorsList from './ErrorsList';

const GameOverModal = (props) => {
  const {
    isLoading,
    error,
    hasErrored,
    score,
    difficultyType,
    isWon,
    isModalOpen,
    time,
    handlePlayAgain,
    addHighScore,
    isSubmitted,
    resetIsSubmitted,
  } = props;

  const [formData, setFormData] = useState({
    playerName: '',
  });
  const [clientErrors, setClientErrors] = useState([]);

  const handleChange = (e) => {
    const val = e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      playerName: val,
    }));
  };

  const handlePlayAgainHelper = (e) => {
    setClientErrors([]);
    handlePlayAgain();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = [];

    if (formData.playerName.length === 0) errors.push('Player Name Required');

    if (errors.length > 0) return setClientErrors(errors);

    setClientErrors([]);

    const scoreData = {
      ...formData,
      difficulty: difficultyType,
      value: score,
      seconds: time,
      createdAt: new Date(),
    };
    addHighScore(scoreData);
  };

  useEffect(() => {
    if (isSubmitted) {
      setTimeout(() => {
        handlePlayAgain();
        resetIsSubmitted();
      }, 1500);
    }
  }, [isSubmitted, handlePlayAgain, resetIsSubmitted]);

  const gameStatus = isWon ? 'You Won' : 'Game Over';

  return (
    <Transition visible={isModalOpen} animation="scale" duration={500}>
      <Modal size="mini" basic centered open={isModalOpen} style={{ textAlign: 'center' }}>
        <Modal.Header><h1>{gameStatus}</h1></Modal.Header>
        <Modal.Content>
          <div>{`Your Score: ${score}`}</div>
          <div>{`Your Time: ${time}`}</div>
          {isWon && (
            <div>
              <form onSubmit={handleSubmit}>
                <Input
                  fluid
                  onChange={handleChange}
                  label="Your Name: "
                  placeholder="Enter desired username..."
                  value={formData.playerName}
                />
              </form>
              <ErrorsList
                clientErrors={clientErrors}
                hasErrored={hasErrored}
                serverError={error}
              />
            </div>
          )}
        </Modal.Content>
        <Modal.Actions>
          {isWon && (
            <Button
              basic
              color="red"
              inverted
              disabled={isSubmitted}
              content={!isSubmitted ? 'Submit Score' : 'Submitted!'}
              loading={isLoading}
              onClick={handleSubmit}
            />
          )}
          <Button
            basic
            color="green"
            inverted
            content="Play Again"
            onClick={handlePlayAgainHelper}
          />
        </Modal.Actions>
      </Modal>
    </Transition>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.leaderboard.isLoading,
  isSubmitted: state.leaderboard.isSubmitted,
  hasErrored: state.leaderboard.hasErrored,
  error: state.leaderboard.error,
});

const mapDispatchToProps = (dispatch) => ({
  addHighScore: (data) => dispatch(LeaderboardActions.addHighScore(data)),
  resetIsSubmitted: () => dispatch(LeaderboardActions.resetIsSubmitted()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameOverModal);
