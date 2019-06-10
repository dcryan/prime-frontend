import React from 'react';
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Header from './header';

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
  const classes = useStyles();
  const [values, setValues] = React.useState({
    name: 'test',
    address: 'test',
    city: 'test',
    state: 'test',
    zip: 'test',
  });
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <div>
      <Header title="Create Location" hideMenu backButton history={history} />
      <form className={classes.container} noValidate autoComplete="off">
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
