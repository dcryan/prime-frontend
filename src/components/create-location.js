import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Header from './header';
import { useFirebase } from '../firebase';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  submitButton: {
    margin: theme.spacing(1),
  },
}));
function CreateLocation({ history }) {
  // State
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  });

  const firebase = useFirebase();
  const classes = useStyles();

  const validInputs =
    values.name !== '' &&
    values.address !== '' &&
    values.city !== '' &&
    values.state !== '' &&
    values.zip !== '';

  // Helpers
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();

    const locationsRef = firebase.firestore().collection('locations');
    try {
      setLoading(true);
      await locationsRef.add(values);
      // successful

      history.goBack();
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header
        title="Create Location"
        hideMenu
        backButton
        loading={loading}
        error={error}
        history={history}
      />
      <form
        className={classes.container}
        noValidate
        autoComplete="off"
        onSubmit={onSubmit}
      >
        <TextField
          label="Name"
          className={classes.textField}
          value={values.name}
          onChange={handleChange('name')}
          margin="normal"
        />
        <TextField
          label="Address"
          className={classes.textField}
          value={values.address}
          onChange={handleChange('address')}
          margin="normal"
        />
        <TextField
          label="City"
          className={classes.textField}
          value={values.city}
          onChange={handleChange('city')}
          margin="normal"
        />
        <TextField
          label="State"
          className={classes.textField}
          value={values.state}
          onChange={handleChange('state')}
          margin="normal"
        />
        <TextField
          label="Zip"
          className={classes.textField}
          value={values.zip}
          onChange={handleChange('zip')}
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className={classes.submitButton}
          disabled={!validInputs}
        >
          Create
        </Button>
      </form>
    </div>
  );
}

CreateLocation.propTypes = {
  history: PropTypes.object,
};

export default CreateLocation;
