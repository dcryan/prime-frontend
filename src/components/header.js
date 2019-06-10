import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link as RouterLink } from 'react-router-dom';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import { useSelector } from 'react-redux';

import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Link from '@material-ui/core/Link';

import AppBar from '@material-ui/core/AppBar';

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  list: {
    width: 250,
  },
  title: {
    flexGrow: 1,
  },
  companyName: {
    height: 44,
  },
  sideMenuAppBar: {
    top: 'auto',
    bottom: 0,
  },
}));

function Header({ title, rightBarButton, hideMenu, backButton, history }) {
  const [sideMenuVisible, setSideMenuVisible] = useState(false);
  const classes = useStyles();

  const navigationList = [
    {
      text: 'Team',
      icon: 'users',
      nav: '/team',
    },
    {
      text: 'Locations',
      icon: 'home',
      nav: '/locations',
    },
    {
      text: 'Games',
      icon: 'dice',
      nav: '/games',
    },
  ];

  const signOut = () => {};
  const goBack = () => {
    history.goBack();
    setSideMenuVisible(false);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          {!hideMenu && (
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
              onClick={() => setSideMenuVisible(true)}
            >
              <FontAwesomeIcon icon="bars" />
            </IconButton>
          )}

          {history && backButton && (
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
              onClick={goBack}
            >
              <FontAwesomeIcon icon="chevron-left" />
            </IconButton>
          )}
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
          {rightBarButton}
        </Toolbar>
      </AppBar>
      <Drawer open={sideMenuVisible} onClose={() => setSideMenuVisible(false)}>
        <div className={classes.list} role="presentation">
          <Typography variant="h6" className={classes.companyName}>
            Team Name
          </Typography>

          <Divider />
          <List>
            {navigationList.map(navInfo => (
              <Link
                key={navInfo.text}
                style={{ textDecoration: 'none' }}
                color="inherit"
                component={RouterLink}
                to={navInfo.nav}
              >
                <ListItem button key={navInfo.text}>
                  <ListItemIcon>
                    <FontAwesomeIcon icon={navInfo.icon} />
                  </ListItemIcon>
                  <ListItemText primary={navInfo.text} />
                </ListItem>
              </Link>
            ))}
          </List>
          <AppBar position="fixed" className={classes.sideMenuAppBar}>
            <Toolbar>
              <IconButton
                edge="end"
                color="inherit"
                aria-label="Menu"
                onClick={signOut}
              >
                <FontAwesomeIcon icon="sign-out" />
              </IconButton>
            </Toolbar>
          </AppBar>
        </div>
      </Drawer>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  rightBarButton: PropTypes.element,
  hideMenu: PropTypes.bool,
  backButton: PropTypes.bool,
  history: PropTypes.object,
};

export default Header;
