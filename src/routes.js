import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Games from './components/games';
import Game from './components/game';
import CreateGame from './components/create-game';
import BingoGame from './components/bingo-game';
import GameBoards from './components/game-boards';
import Locations from './components/locations';
import Location from './components/location';
import Team from './components/team';
import CreateTeamMember from './components/create-team-member';
import TeamMember from './components/team-member';
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
        <PrivateRoute exact path="/games/:gameId" component={Game} />
        <PrivateRoute exact path="/games/:gameId/start" component={BingoGame} />
        <PrivateRoute
          exact
          path="/games/:gameId/game-boards"
          component={GameBoards}
        />
        <PrivateRoute exact path="/locations" component={Locations} />
        <PrivateRoute
          exact
          path="/locations/:locationId"
          component={Location}
        />
        <PrivateRoute
          exact
          path="/locations/create"
          component={CreateLocation}
        />
        <PrivateRoute exact path="/team" component={Team} />
        <PrivateRoute
          exact
          path="/team/member/create"
          component={CreateTeamMember}
        />
        <PrivateRoute
          exact
          path="/team/member/:userId"
          component={TeamMember}
        />
        <Route component={SignIn} />
      </Switch>
    </Router>
  );
}

export default Routes;
