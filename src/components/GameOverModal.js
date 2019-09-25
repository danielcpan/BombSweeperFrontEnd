import React, { useState } from 'react'
import { Button, Modal, Transition } from 'semantic-ui-react'

const GameOverModal = props => {
  const { isGameOver, handlePlayAgain } = props;

  return (
    <Transition visible={isGameOver} animation='scale' duration={500}>
      <Modal size='mini' basic centered open={isGameOver}>
        <Modal.Header>Game Over</Modal.Header>
        <Modal.Content>
          <p>Your Score: 123</p>
          <p>Your High Score: 112</p>
          <p>Your Name: Dpizzle</p>
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