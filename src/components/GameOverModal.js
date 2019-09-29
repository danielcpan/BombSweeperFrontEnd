import React, { useState } from 'react'
import { connect } from 'react-redux';
import { Button, Modal, Transition, Input } from 'semantic-ui-react'
import * as LeaderboardActions from '../actions/leaderboardActions';

const GameOverModal = props => {
  const { score, isModalOpen, isWon, handlePlayAgain, addHighScore } = props;
  const [formData, setFormData] = useState({
    playerName: '' 
  })

  const handleChange = (e) => {
    const val = e.target.value;
    setFormData(prevState => ({
      ...prevState,
      playerName: val
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const scoreData = {
      ...formData,
      difficulty: 'Beginner',
      value: score,
      seconds: 50,
      createdAt: new Date()
    }
    addHighScore(scoreData);
  }

  // console.log(formData)

  const gameStatus = isWon ? 'You Won' : 'Game Over';

  return (
    <Transition visible={isModalOpen} animation='scale' duration={500}>
      <Modal size='mini' basic centered open={isModalOpen} style={{textAlign: 'center'}}>
        <Modal.Header><h1>{gameStatus}</h1></Modal.Header>
        <Modal.Content>
          <div>Your Score: {score}</div>
          <div>Your High Score: N/A</div>
          <div>
            <form onSubmit={handleSubmit}>
              <span>Your Name:</span>
              <Input 
                fluid 
                onChange={handleChange}
                placeholder='Enter desired username...'
                value={formData.playerName}
              />
            </form>
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button 
            basic 
            color='red' 
            inverted 
            content='Submit Score' 
            onClick={handleSubmit}
            />
          <Button 
            basic 
            color='green' 
            inverted 
            content='Play Again' 
            onClick={() => handlePlayAgain()}
            />
        </Modal.Actions>
      </Modal>
    </Transition>
  )
}

const mapDispatchToProps = dispatch => ({
  addHighScore: data => dispatch(LeaderboardActions.addHighScore(data))
  // setUpBoard: (rows, cols, mineCount) => dispatch(BoardActions.setUpBoard(rows, cols, mineCount)),
});

export default connect(null, mapDispatchToProps)(GameOverModal)