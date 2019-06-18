import React from 'react';
import { Typography, List, ListItem, ListItemText } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Header from './header';
import { useCollectionFiltered } from '../hooks/firebase';
import Layout from './layout';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
}));

export default function Team({ history }) {
  const classes = useStyles();
  const { error, loading, collection: team } = useCollectionFiltered('users');

  const goToUser = userId => {
    history.push(`team/member/${userId}`);
  };

  return (
    <div>
      <Header
        title="Team Members"
        loading={loading}
        error={error}
        history={history}
        rightBarButton={
          <Link color="inherit" component={RouterLink} to="/team/member/create">
            <IconButton edge="start" color="inherit" aria-label="Menu">
              <FontAwesomeIcon icon="plus" />
            </IconButton>
          </Link>
        }
      />

      <Layout>
        {team && team.length === 0 && (
          <Typography className={classes.text}>No Team Members</Typography>
        )}

        <List className={classes.root}>
          {team &&
            team.map(teamMemberMetaData => {
              const user = teamMemberMetaData.data();
              const userId = teamMemberMetaData.id;
              return (
                <ListItem
                  key={user.email}
                  button
                  onClick={() => goToUser(userId)}
                >
                  <ListItemText
                    primary={`${user.firstName} ${user.lastName}`}
                    secondary={user.email}
                  />
                </ListItem>
              );
            })}
        </List>
      </Layout>
    </div>
  );
}
Team.propTypes = {
  history: PropTypes.object,
};
