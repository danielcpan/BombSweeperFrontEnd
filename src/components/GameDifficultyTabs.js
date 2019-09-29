import React, { useState } from 'react';
import { Button, Container, Grid } from 'semantic-ui-react'
import { BEGINNER, INTERMEDIATE, EXPERT } from '../constants/difficultyTypes';

const App = props => {
  const { handleClick } = props;

  const [difficulty, setDifficulty] = useState(BEGINNER);

  const handleActive = difficulty => () => {
    setDifficulty(difficulty);
    handleClick(difficulty);
  }

  return (
    <Container>
      <Grid.Column style={{marginTop: 10}}>
        <Button 
          active={difficulty === BEGINNER} 
          onClick={handleActive(BEGINNER)}
          content='Beginner'
        />
        <Button 
          active={difficulty === INTERMEDIATE} 
          onClick={handleActive(INTERMEDIATE)}
          content='Intermediate'
        />
        <Button 
          active={difficulty === EXPERT} 
          onClick={handleActive(EXPERT)}
          content='Expert'
        />
      </Grid.Column>    
    </Container>
  );
}

export default App;
