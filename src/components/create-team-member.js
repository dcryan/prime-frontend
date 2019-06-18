import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Header from './header';
import { useFirebase } from '../firebase';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    margin: theme.spacing(1),
  },
  textField: {},
  submitButton: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function CreateTeamMember({ history }) {
  const firebase = useFirebase();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const classes = useStyles();
  const [values, setValues] = React.useState({
    firstName: 'test',
    lastName: 'test',
    email: 'test@test.com',
    password: 'test123',
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();

    const currentUser = await firebase
      .firestore()
      .collection('users')
      .doc(firebase.currentUser().uid)
      .get();

    try {
      setLoading(true);
      const newUser = await firebase.doCreateUserWithEmailAndPassword(
        values.email,
        values.password
      );

      const newUserRef = firebase
        .firestore()
        .collection('users')
        .doc(newUser.user.uid);
      await newUserRef.set({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,

        // pull the same team as the current user.
        teamId: currentUser.data().teamId,
      });

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
        title="Create Team Member"
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
          label="First Name"
          className={classes.textField}
          value={values.name}
          onChange={handleChange('firstName')}
          margin="normal"
        />
        <TextField
          label="Last Name"
          className={classes.textField}
          value={values.name}
          onChange={handleChange('lastName')}
          margin="normal"
        />
        <TextField
          label="email"
          className={classes.textField}
          value={values.name}
          onChange={handleChange('email')}
          margin="normal"
        />
        <TextField
          label="Password"
          className={classes.textField}
          value={values.name}
          onChange={handleChange('password')}
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className={classes.submitButton}
        >
          Create Team
        </Button>
      </form>
    </div>
  );
}

CreateTeamMember.propTypes = {
  history: PropTypes.object,
};

export default CreateTeamMember;
