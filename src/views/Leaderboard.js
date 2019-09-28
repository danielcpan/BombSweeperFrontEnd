import React, { useState } from 'react'
import _ from 'lodash'
import { Icon, Menu, Table, Container } from 'semantic-ui-react'

const leaderboard = [
  { rank: 1, player: 'TestPlayer1', score: 3, time: 0.5, date: '18 September 2019'},
  { rank: 2, player: 'TestPlayer2', score: 5, time: 0.75, date: '18 September 2018'},
  { rank: 3, player: 'TestPlayer3', score: 8, time: 0.95, date: '18 September 2019'},
  { rank: 4, player: 'TestPlayer4', score: 4, time: 1.05, date: '18 September 2019'},
  { rank: 5, player: 'TestPlayer5', score: 9, time: 1.15, date: '18 September 2019'},
  { rank: 6, player: 'TestPlayer6', score: 15, time: 1.19, date: '18 September 2019'},
]

const TableExamplePagination = props => {
  const [column, setColumn] = useState(null);
  const [data, setData] = useState(leaderboard);
  const [direction, setDirection] = useState(null);

  const handleSort = clickedColumn => () => {
    if (column !== clickedColumn) {
      setColumn(clickedColumn);
      setData(_.sortBy(data, [clickedColumn]));
      setDirection('ascending');
      return;
    }

    setData(data.reverse());
    setDirection(direction === 'ascending' ? 'descending' : 'ascending');
  }

  return (
    <Container style={{marginTop: 25}}>
      <Table unstackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell 
              width={2}
              sorted={column === 'Rank' ? direction : null}
              onClick={handleSort('Rank')}
              content={'Rank'}
            />
            <Table.HeaderCell 
              width={4}
              sorted={column === 'Player' ? direction : null}
              onClick={handleSort('Player')}
              content={'Player'}
            />
            <Table.HeaderCell 
              width={2}
              sorted={column === 'Score' ? direction : null}
              onClick={handleSort('Score')}
              content={'Score'}
            />
            <Table.HeaderCell 
              width={2}
              sorted={column === 'Time' ? direction : null}
              onClick={handleSort('Time')}
              content={'Time'}
            />
            <Table.HeaderCell 
              width={6}
              sorted={column === 'Date' ? direction : null}
              onClick={handleSort('Date')}
              content={'Date'}
            />                                                
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data.map(el => (
            <Table.Row key={el.player}>
              <Table.Cell>{el.rank}</Table.Cell>
              <Table.Cell>{el.player}</Table.Cell>
              <Table.Cell>{el.score}</Table.Cell>
              <Table.Cell>{el.time}</Table.Cell>
              <Table.Cell>{el.date}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>

        {/* <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan='5'>
              <Menu floated='right' pagination>
                <Menu.Item as='a' icon>
                  <Icon name='chevron left' />
                </Menu.Item>
                <Menu.Item as='a'>1</Menu.Item>
                <Menu.Item as='a'>2</Menu.Item>
                <Menu.Item as='a'>3</Menu.Item>
                <Menu.Item as='a'>4</Menu.Item>
                <Menu.Item as='a' icon>
                  <Icon name='chevron right' />
                </Menu.Item>
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer> */}
      </Table>
    </Container>
  )
}

export default TableExamplePagination