import React, { useState } from 'react';
import { TextField, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ACTIONS } from '../store/auth';
import { withFirebase } from '../auth';

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

function SignIn({ history, firebase }) {
  const classes = useStyles();
  const [values, setValues] = useState({
    email: 'daniel.c.ryan@icloud.com',
    password: 'test123',
    error: null,
  });
  const disableSubmitButton = values.email === '' || values.password === '';

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();

    try {
      await firebase.doSignInWithEmailAndPassword(
        values.email,
        values.password
      );

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
            id="email-unique"
            label="Email"
            className={classes.textField}
            value={values.email}
            onChange={handleChange('email')}
            margin="normal"
            variant="outlined"
          />

          <TextField
            id="password-uniasdfj"
            type="password"
            label="Password"
            className={classes.textField}
            value={values.password}
            onChange={handleChange('password')}
            margin="normal"
            variant="outlined"
          />
          <Typography>
            Forget your password?
            <Link color="inherit" component={RouterLink} to="/forgot-password">
              <Button color="primary">Reset password</Button>
            </Link>
          </Typography>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className={classes.submitButton}
            disabled={disableSubmitButton}
          >
            Sign In
          </Button>
          <div className={classes.createAccount}>
            <Typography>
              No account?
              <Link color="inherit" component={RouterLink} to="/sign-up">
                <Button color="primary">Create account</Button>
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

SignIn.propTypes = {
  history: PropTypes.object,
  firebase: PropTypes.object,
};

const mapStateToProps = ({ auth }) => ({ auth });
const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withFirebase(SignIn));
