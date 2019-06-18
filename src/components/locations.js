import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Typography, List, ListItem, ListItemText } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import PropTypes from 'prop-types';
import Header from './header';
import { useCollectionFiltered } from '../hooks/firebase';
import Layout from './layout';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
  text: {
    textAlign: 'center',
  },
}));

export default function Locations({ history }) {
  const classes = useStyles();
  const { loading, error, collection: locations } = useCollectionFiltered(
    'locations'
  );

  const goToLocation = gameId => {
    history.push(`locations/${gameId}`);
  };

  console.log('locations', locations);
  return (
    <div>
      <Header
        title="Locations"
        loading={loading}
        error={error}
        history={history}
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

      <Layout>
        {locations && locations.length === 0 && (
          <Typography className={classes.text}>No Locations</Typography>
        )}

        <List className={classes.root}>
          {locations &&
            locations.map(locationMetaData => {
              const location = locationMetaData.data();
              const locationId = locationMetaData.id;
              return (
                <ListItem
                  key={location.name}
                  button
                  onClick={() => goToLocation(locationId)}
                >
                  <ListItemText
                    primary={location.name}
                    secondary={location.address}
                  />
                </ListItem>
              );
            })}
        </List>
      </Layout>
    </div>
  );
}

Locations.propTypes = {
  history: PropTypes.object,
};
