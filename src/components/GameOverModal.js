import React, { useState } from 'react'
import { Button, Modal, Transition, Input } from 'semantic-ui-react'

const GameOverModal = props => {
  const { score, isModalOpen, isGameOver, handlePlayAgain } = props;

  const gameStatus = isGameOver ? 'Game Over' : 'You Won';

  return (
    <Transition visible={isModalOpen} animation='scale' duration={500}>
      <Modal size='mini' basic centered open={isModalOpen} style={{textAlign: 'center'}}>
        <Modal.Header><h1>{gameStatus}</h1></Modal.Header>
        <Modal.Content>
          <div>Your Score: {score}</div>
          <div>Your High Score: N/A</div>
          <div>
            <span>Your Name:</span>
            <Input fluid placeholder='Search...' />
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button 
            basic 
            color='red' 
            inverted 
            content='Submit Score' 
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

export default GameOverModal