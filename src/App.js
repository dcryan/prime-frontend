import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import Routes from './routes';
import store from './store';
import FontAwesome from './font-awesome';
import { UserContext } from './session';
import { useAuth } from './hooks/firebase';
import './App.css';

export default function App() {
  useEffect(() => {
    FontAwesome.init();
  }, []);

  const { initializing, userId, user } = useAuth();

  if (initializing) {
    return <div>Loading</div>;
  }

  return (
    <Provider store={store}>
      <UserContext.Provider value={{ userId, user }}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Routes />
        </MuiPickersUtilsProvider>
      </UserContext.Provider>
    </Provider>
  );
}
