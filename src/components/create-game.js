import React from 'react';
import PropType from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  TextField,
  Button,
  Select,
  Input,
  InputLabel,
  MenuItem,
  FormControl,
} from '@material-ui/core';
import { KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import Header from './header';
import { useFirebase } from '../auth';

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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const locations = ["Henry's", 'Ironwood Social', 'Spitfire'];
const genreCategories = ['oldies', "60's", "70's", "80's", "90's"];

export default function CreateGame({ history }) {
  const firebase = useFirebase();

  const classes = useStyles();
  const [values, setValues] = React.useState({
    name: '',
    dateTime: new Date(),
    locationId: '',
    cardCount: 50,
    genres: [],
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleDateChange = dateTime => {
    setValues({ ...values, dateTime });
  };

  const onSubmit = () => {
    const gamesRef = firebase.firestore().collection('games');
    gamesRef.add(values);
  };

  return (
    <div>
      <Header title="Create Game" hideMenu backButton history={history} />
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
        <KeyboardDatePicker
          id="mui-pickers-date"
          label="Date"
          className={classes.textField}
          value={values.dateTime}
          onChange={handleDateChange}
          margin="normal"
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardTimePicker
          id="mui-pickers-time"
          label="Time"
          className={classes.textField}
          value={values.dateTime}
          onChange={handleDateChange}
          margin="normal"
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
        <FormControl className={classes.textField}>
          <InputLabel htmlFor="select-multiple">Locations</InputLabel>
          <Select
            value={values.locationId}
            onChange={handleChange('locationId')}
            input={<Input id="select-multiple" />}
            MenuProps={MenuProps}
          >
            {locations.map(location => (
              <MenuItem key={location} value={location}>
                {location}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Card Count"
          className={classes.textField}
          type="number"
          value={values.cardCount}
          onChange={handleChange('cardCount')}
          margin="normal"
        />
        <FormControl className={classes.textField}>
          <InputLabel htmlFor="select-multiple">Genres</InputLabel>
          <Select
            multiple
            value={values.genres}
            onChange={handleChange('genres')}
            input={<Input id="select-multiple" />}
            MenuProps={MenuProps}
          >
            {genreCategories.map(category => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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

CreateGame.propTypes = {
  history: PropType.object,
};
