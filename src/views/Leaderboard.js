import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react'
import * as LeaderboardActions from '../actions/leaderboardActions';
import LeaderboardTable from '../components/LeaderboardTable';
import GameDifficultyTabs from '../components/GameDifficultyTabs';
import { BEGINNER } from '../constants/difficultyTypes';

const Leaderboard = props => {
  const { leaderboard ,fetchLeaderboard } = props;

  const [difficultyType, setDifficultyType] = useState(BEGINNER)

  useEffect(() => {
    fetchLeaderboard({ difficulty: difficultyType })
  }, [fetchLeaderboard, difficultyType])

  const handleGameDifficultyChange = difficultyType => {
    setDifficultyType(difficultyType);
  }

  return (
    <Container style={{marginTop: 20}}>
      <GameDifficultyTabs handleClick={handleGameDifficultyChange}/>
      <LeaderboardTable data={leaderboard}/>
    </Container>
  )
}

const mapStateToProps = state => ({
  leaderboard: state.leaderboard.scores,
});

const mapDispatchToProps = dispatch => ({
  fetchLeaderboard: (params) => dispatch(LeaderboardActions.fetchLeaderboard(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard)