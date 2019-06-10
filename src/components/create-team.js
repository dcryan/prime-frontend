import React from 'react';
import PropTypes from 'prop-types';
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import Header from './header';

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

function CreateTeam({ history }) {
  const classes = useStyles();
  const { id: memberId } = useSelector(state => state.member);
  const [values, setValues] = React.useState({
    name: 'test',
    memberTeamId: memberId,
  });

  console.log('memberId', memberId);

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <div>
      <Header title="Create Team" hideMenu backButton history={history} />
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          label="Name"
          className={classes.textField}
          value={values.name}
          onChange={handleChange('name')}
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

CreateTeam.propTypes = {
  history: PropTypes.object,
};

export default CreateTeam;
