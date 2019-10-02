import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import * as LeaderboardActions from '../actions/leaderboardActions';
import LeaderboardTable from '../components/LeaderboardTable';
import GameDifficultyTabs from '../components/GameDifficultyTabs';

import { getLeaderboardWithRank } from '../reducers/leaderboardReducer';

const Leaderboard = (props) => {
  const {
    difficultyType,
    leaderboard,
    isLoading,
    fetchLeaderboard,
  } = props;

  const [currentLeaderboard, setCurrentLeaderboard] = useState([]);

  useEffect(() => {
    fetchLeaderboard({ difficulty: difficultyType });
  }, [fetchLeaderboard, difficultyType]);

  useEffect(() => {
    setCurrentLeaderboard(leaderboard);
  }, [leaderboard, isLoading])

  return (
    <Container style={{ marginTop: 20 }}>
      <GameDifficultyTabs />
      <LeaderboardTable
        difficultyType={difficultyType}
        currentLeaderboard={currentLeaderboard}
        isLoading={isLoading}
      />
    </Container>
  );
};

const mapStateToProps = (state) => ({
  difficultyType: state.game.difficultyType,
  isLoading: state.leaderboard.isLoading,
  hasErrored: state.leaderboard.hasErrored,
  error: state.leaderboard.error,
  leaderboard: getLeaderboardWithRank(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchLeaderboard: (params) => dispatch(LeaderboardActions.fetchLeaderboard(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard);
