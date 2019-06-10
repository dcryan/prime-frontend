import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Games from './components/games';
import CreateGame from './components/create-game';
import Locations from './components/locations';
import Team from './components/team';
import CreateTeam from './components/create-team';
import CreateLocation from './components/create-location';
import SignIn from './components/sign-in';
import SignUp from './components/sign-up';
import PrivateRoute from './components/private-route';

const history = createBrowserHistory();

function Routes() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/sign-in" component={SignIn} />
        <Route exact path="/sign-up" component={SignUp} />
        <PrivateRoute exact path="/games" component={Games} />
        <PrivateRoute exact path="/games/create" component={CreateGame} />
        <PrivateRoute exact path="/locations" component={Locations} />
        <PrivateRoute
          exact
          path="/locations/create"
          component={CreateLocation}
        />
        <PrivateRoute exact path="/team" component={Team} />
        <PrivateRoute exact path="/team/create" component={CreateTeam} />
        <Route component={SignIn} />
      </Switch>
    </Router>
  );
}

export default Routes;
