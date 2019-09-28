import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react'
import * as LeaderboardActions from '../actions/leaderboardActions';
import LeaderboardTable from '../components/LeaderboardTable';

const Leaderboard = props => {
  const { leaderboard ,fetchLeaderboard } = props;

  useEffect(() => {
    fetchLeaderboard()
  }, [fetchLeaderboard])

  console.log(leaderboard)

  return (
    <Container style={{marginTop: 25}}>
      <LeaderboardTable data={leaderboard}/>
    </Container>
  )
}

const mapStateToProps = state => ({
  leaderboard: state.leaderboard.scores,
});

const mapDispatchToProps = dispatch => ({
  fetchLeaderboard: () => dispatch(LeaderboardActions.fetchLeaderboard())
});

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard)