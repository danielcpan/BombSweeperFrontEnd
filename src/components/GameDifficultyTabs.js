import React from 'react';
import { connect } from 'react-redux';
import { Button, Container, Grid } from 'semantic-ui-react';
import { BEGINNER, INTERMEDIATE, EXPERT } from '../constants/difficultyTypes';
import * as GameActions from '../actions/gameActions';

const GameDifficultyTabs = (props) => {
  const { difficultyType, updateGame } = props;

  const handleActive = (difficulty) => () => {
    updateGame({ difficultyType: difficulty });
  };

  return (
    <Container>
      <Grid.Column style={{ marginTop: 10 }}>
        <Button
          active={difficultyType === BEGINNER}
          onClick={handleActive(BEGINNER)}
          content="Beginner"
        />
        <Button
          active={difficultyType === INTERMEDIATE}
          onClick={handleActive(INTERMEDIATE)}
          content="Intermediate"
        />
        <Button
          active={difficultyType === EXPERT}
          onClick={handleActive(EXPERT)}
          content="Expert"
        />
      </Grid.Column>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  difficultyType: state.game.difficultyType,
});

const mapDispatchToProps = (dispatch) => ({
  updateGame: (settings) => dispatch(GameActions.updateGame(settings)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameDifficultyTabs);
