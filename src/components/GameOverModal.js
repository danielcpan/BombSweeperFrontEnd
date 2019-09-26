import React, { useState } from 'react'
import { Button, Modal, Transition, Input } from 'semantic-ui-react'

const GameOverModal = props => {
  const { score, isGameOver, handlePlayAgain } = props;

  return (
    <Transition visible={isGameOver} animation='scale' duration={500}>
      <Modal size='mini' basic centered open={isGameOver} style={{textAlign: 'center'}}>
        <Modal.Header><h1>Game Over</h1></Modal.Header>
        <Modal.Content>
        {/* <div style={{ textAlign: 'center'}}>Your Score: 123</div> */}
          <div>Your Score: {score}</div>
          <div>Your High Score: 112</div>
          {/* <input>Hello</input> */}
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