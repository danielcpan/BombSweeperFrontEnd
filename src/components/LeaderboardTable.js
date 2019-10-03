import React, { useState, useEffect } from 'react';
import format from 'date-fns/format';
import _ from 'lodash';
import { Table, Container, Loader } from 'semantic-ui-react';

const LeaderboardTable = (props) => {
  const { difficultyType, currentLeaderboard, isLoading } = props;
  const [column, setColumn] = useState(null);
  const [data, setData] = useState([]);
  const [direction, setDirection] = useState(null);

  const handleSort = (clickedColumn) => () => {
    if (column !== clickedColumn) {
      setColumn(clickedColumn);
      setData(_.sortBy(data, [clickedColumn]));
      setDirection('ascending');
      return;
    }

    setData(data.reverse());
    setDirection(direction === 'ascending' ? 'descending' : 'ascending');
  };

  const formatDifficultyType = (difficultyType) => difficultyType.charAt(0).toUpperCase() + difficultyType.slice(1);

  useEffect(() => {
    setData(currentLeaderboard);
  }, [currentLeaderboard]);

  return (
    <Container style={{ marginTop: 25 }}>
      <div>
        <h1>
          {`Top 100 Scores for ${formatDifficultyType(difficultyType)}`}
        </h1>
      </div>
      <Table unstackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={column === 'Rank' ? direction : null}
              onClick={handleSort('Rank')}
              content="Rank"
            />
            <Table.HeaderCell
              sorted={column === 'Player' ? direction : null}
              onClick={handleSort('Player')}
              content="Player"
            />
            <Table.HeaderCell
              sorted={column === 'Score' ? direction : null}
              onClick={handleSort('Score')}
              content="Score (clicks)"
            />
            <Table.HeaderCell
              sorted={column === 'Time' ? direction : null}
              onClick={handleSort('Time')}
              content="Time (seconds)"
            />
            <Table.HeaderCell
              sorted={column === 'Date' ? direction : null}
              onClick={handleSort('Date')}
              content="Date"
            />
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data.map((score) => (
            <Table.Row key={score._id}>
              <Table.Cell>{score.rank}</Table.Cell>
              <Table.Cell>{score.playerName}</Table.Cell>
              <Table.Cell>{score.value}</Table.Cell>
              <Table.Cell>{score.seconds}</Table.Cell>
              <Table.Cell>{format(new Date(score.createdAt), 'MMM dd, yyyy')}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Loader active={isLoading} inline="centered" />
    </Container>
  );
};

export default LeaderboardTable;
