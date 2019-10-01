import React from 'react';
import { List } from 'semantic-ui-react';

const ErrorsList = (props) => {
  const { clientErrors, hasErrored, serverError } = props;
  const serverErrorList = hasErrored ? serverError.message.split(',') : []

  return (
    <List bulleted>
      {clientErrors.map((err, idx) => (
        <List.Item key={idx} style={styles.error}>
          {err}
        </List.Item>
      ))}
      {serverErrorList.map((err, idx) => (
        <List.Item key={idx} style={styles.error}>
          {err}
        </List.Item>
      ))}
    </List>
  );
};

const styles = ({
  error: {
    color: '#ff695e'
  }
});

export default ErrorsList;
