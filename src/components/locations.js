import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import makeStyles from '@material-ui/core/styles/makeStyles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Header from './header';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Locations() {
  const classes = useStyles();
  return (
    <div>
      <Header
        title="Locations"
        rightBarButton={
          <Link color="inherit" component={RouterLink} to="/locations/create">
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            >
              <FontAwesomeIcon icon="plus" />
            </IconButton>
          </Link>
        }
      />
      <ListItem>
        <ListItemText primary="No Locations" />
      </ListItem>

      <List className={classes.root}>
        {/* {data.listLocations.items.map((location, i) => (
                <ListItem key={i}>
                  <ListItemText
                    primary={location.name}
                    secondary={location.address}
                  />
                </ListItem>
              ))} */}
      </List>
    </div>
  );
}
