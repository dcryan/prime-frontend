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

export default function TeamMember({ match, history }) {
  const classes = useStyles();
  const { error, loading, document: user } = useDocumentData(
    `users/${match.params.userId}`
  );

  return (
    <div className={classes.root}>
      <Header
        title="Game"
        loading={loading}
        error={error}
        hideMenu
        backButton
        history={history}
      />
      {user && (
        <Layout>
          <div className={classes.container}>
            <Typography variant="h3">
              {user.firstName} {user.lastName}
            </Typography>
            <Typography variant="h5">{user.email}</Typography>
            <Typography variant="h6">Role: Admin</Typography>
          </div>
        </Layout>
      )}
    </div>
  );
}

TeamMember.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
};
