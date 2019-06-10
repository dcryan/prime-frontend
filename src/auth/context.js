import React, { useContext } from 'react';
import Firebase from './firebase';

const FirebaseContext = React.createContext(new Firebase());

// TODO: we can do away with 'withFirebase' because of the 'useFirebase' hook below.
export function withFirebase(Component) {
  return function wrappedWithFirebase(props) {
    return (
      <FirebaseContext.Consumer>
        {firebase => <Component displayName {...props} firebase={firebase} />}
      </FirebaseContext.Consumer>
    );
  };
}

export default FirebaseContext;

export const useFirebase = () => useContext(FirebaseContext);
