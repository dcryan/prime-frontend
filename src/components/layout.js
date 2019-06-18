import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  container: {
    maxWidth: 1024,
    margin: `0 auto`,
  },
}));

export default function Layout({ children }) {
  const classes = useStyles();
  return <div className={classes.container}>{children}</div>;
}

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
