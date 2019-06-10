import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Header from './header';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(1),
  },
  textField: {},
}));

export default function Team({ history }) {
  const classes = useStyles();
  const team = useSelector(state => state.team);

  const goToCreateTeam = () => {
    history.push('');
  };

  return (
    <div>
      <Header title="Team" />
      {!team.id && (
        <div className={classes.container}>
          <Typography>You are not a part of a team.</Typography>
          <Typography>
            Would you like to create one?
            <Link
              style={{ textDecoration: 'none' }}
              color="inherit"
              component={RouterLink}
              to="/team/create"
            >
              <Button color="primary" onClick={goToCreateTeam}>
                Create Team
              </Button>
            </Link>
          </Typography>
        </div>
      )}
      {team.id && <Typography>You are a part of a team</Typography>}
    </div>
  );
}
Team.propTypes = {
  history: PropTypes.object,
};
