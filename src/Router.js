import React from 'react';
import {
  BrowserRouter, Route, Switch,
} from 'react-router-dom';
import DefaultLayout from './components/DefaultLayout';
import App from './views/App';
import Leaderboard from './views/Leaderboard';

export default () => (
  <BrowserRouter>
    <Switch>
      <DefaultLayout>
        <Route path="/" exact component={App} />
        <Route path="/leaderboard" exact component={Leaderboard} />
      </DefaultLayout>
    </Switch>
  </BrowserRouter>
);
