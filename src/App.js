import React, { Component } from 'react';
import { Provider } from 'react-redux';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import Routes from './routes';
import store from './store';
import FontAwesome from './font-awesome';

class App extends Component {
  componentWillMount() {
    FontAwesome.init();
  }

  render() {
    return (
      <Provider store={store}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Routes />
        </MuiPickersUtilsProvider>
      </Provider>
    );
  }
}

export default App;
