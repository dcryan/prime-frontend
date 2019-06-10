import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { useFirebase } from '../auth';

function PrivateRoute({ component: Component, ...rest }) {
  const firebase = useFirebase();
  // const authenticated = firebase.isLoggedIn();
  const authenticated = true;

  return (
    <Route
      {...rest}
      render={props =>
        authenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/sign-in' }} />
        )
      }
    />
  );
}

PrivateRoute.propTypes = {
  component: PropTypes.func,
  location: PropTypes.object,
};

export default PrivateRoute;
