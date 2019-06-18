import React, { useState } from 'react';
import { TextField, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { useFirebase } from '../firebase';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(3),
  },
  title: {
    textAlign: 'center',
  },
  formContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    maxWidth: 400,
  },
  textField: {},
  submitButton: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  createAccount: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

function SignUp({ history }) {
  const firebase = useFirebase();
  const classes = useStyles();
  const [values, setValues] = useState({
    email: 'daniel@test.com',
    password: 'test123',
    firstName: 'Daniel',
    lastName: 'Ryan',
    teamName: '',
    error: null,
  });

  const validInputs =
    values.email !== '' &&
    values.password !== '' &&
    values.firstName !== '' &&
    values.lastName !== '';

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();

    try {
      await firebase.doCreateUserWithEmailAndPassword(
        values.email,
        values.password
      );

      const teamRef = firebase.firestore().collection('team');
      const teamMetaData = await teamRef.add({
        name: values.teamName,
      });

      const usersRef = firebase
        .firestore()
        .collection('users')
        .doc(firebase.currentUser().uid);
      await usersRef.set({
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        teamId: teamMetaData.id,
      });

      history.push('/games');
    } catch (error) {
      setValues({ ...values, error });
    }
  };

  return (
    <div className={classes.container}>
      <div>
        <Typography variant="h2" className={classes.title}>
          PRIME
        </Typography>

        <form
          className={classes.formContainer}
          noValidate
          autoComplete="off"
          onSubmit={onSubmit}
        >
          <TextField
            id="first-name"
            label="First Name"
            className={classes.textField}
            value={values.firstName}
            onChange={handleChange('firstName')}
            margin="normal"
            variant="outlined"
          />

          <TextField
            id="last-name"
            label="Last Name"
            className={classes.textField}
            value={values.lastName}
            onChange={handleChange('lastName')}
            margin="normal"
            variant="outlined"
          />

          <TextField
            id="team-name"
            label="Team Name (optional)"
            className={classes.textField}
            value={values.teamName}
            onChange={handleChange('teamName')}
            margin="normal"
            variant="outlined"
          />

          <TextField
            id="email"
            label="Email"
            className={classes.textField}
            value={values.email}
            onChange={handleChange('email')}
            margin="normal"
            variant="outlined"
          />

          <TextField
            id="password"
            label="Password"
            className={classes.textField}
            value={values.password}
            onChange={handleChange('password')}
            margin="normal"
            variant="outlined"
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className={classes.submitButton}
            disabled={!validInputs}
          >
            Create Account
          </Button>
          <div className={classes.createAccount}>
            <Typography>
              Already have an account?
              <Link color="inherit" component={RouterLink} to="/sign-in">
                <Button color="primary">Sign In</Button>
              </Link>
            </Typography>
          </div>

          {values.error && (
            <Typography variant="caption">{values.error.message}</Typography>
          )}
        </form>
      </div>
    </div>
  );
}

SignUp.propTypes = {
  history: PropTypes.object,
};

export default SignUp;
