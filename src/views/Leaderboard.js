import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import * as LeaderboardActions from '../actions/leaderboardActions';
import LeaderboardTable from '../components/LeaderboardTable';
import GameDifficultyTabs from '../components/GameDifficultyTabs';
import * as DifficultyTypes from '../constants/difficultyTypes';

import { getLeaderboard, getLeaderboardWithRank } from '../reducers/leaderboardReducer';

const Leaderboard = (props) => {
  const {
    isLoading,
    hasErrored,
    error,
    beginnerLeaderboard,
    intermediateLeaderboard,
    expertLeaderboard,
    fetchLeaderboard,
  } = props;

  const [difficultyType, setDifficultyType] = useState(DifficultyTypes.BEGINNER);
  const [currentLeaderboard, setCurrentLeaderboard] = useState([]);

  useEffect(() => {
    const getCurrentLeaderboard = () => props[`${difficultyType}Leaderboard`];

    fetchLeaderboard({ difficulty: difficultyType });
    setCurrentLeaderboard(getCurrentLeaderboard());
  }, [fetchLeaderboard, difficultyType, isLoading]);

  const handleGameDifficultyChange = (difficultyType) => {
    setDifficultyType(difficultyType);
  };

  return (
    <Container style={{ marginTop: 20 }}>
      <GameDifficultyTabs handleClick={handleGameDifficultyChange} />
      <LeaderboardTable 
        difficultyType={difficultyType}
        currentLeaderboard={currentLeaderboard} 
        isLoading={isLoading}
      />
    </Container>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.leaderboard.isLoading,
  hasErrored: state.leaderboard.hasErrored,
  error: state.leaderboard.error,
  beginnerLeaderboard: getLeaderboardWithRank(state, DifficultyTypes.BEGINNER),
  intermediateLeaderboard: getLeaderboardWithRank(state, DifficultyTypes.INTERMEDIATE),
  expertLeaderboard: getLeaderboardWithRank(state, DifficultyTypes.EXPERT),
});

const mapDispatchToProps = (dispatch) => ({
  fetchLeaderboard: (params) => dispatch(LeaderboardActions.fetchLeaderboard(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard);
