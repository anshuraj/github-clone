import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import App from '../App';

const index = () => {
  return (
    <Router>
      <Switch>
        <Route path="/:username">
          <App />
        </Route>
      </Switch>
    </Router>
  );
};

export default index;
