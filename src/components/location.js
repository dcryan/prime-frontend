import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import Header from './header';
import { useDocumentData } from '../hooks/firebase';
import Layout from './layout';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  text: {
    textAlign: 'center',
  },

  container: {
    textAlign: 'center',
    marginTop: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
}));

export default function Location({ match, history }) {
  const classes = useStyles();
  const { error, loading, document: location } = useDocumentData(
    `locations/${match.params.locationId}`
  );

  return (
    <div className={classes.root}>
      <Header
        title="Location"
        loading={loading}
        error={error}
        hideMenu
        backButton
        history={history}
      />
      {location && (
        <Layout>
          <div className={classes.container}>
            <Typography variant="h3">{location.name}</Typography>
            <Typography variant="h6">{location.address}</Typography>
            <Typography variant="h6">{location.city}</Typography>
            <Typography variant="h6">{location.state}</Typography>
            <Typography variant="h6">{location.zip}</Typography>
          </div>
        </Layout>
      )}
    </div>
  );
}

Location.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
};
