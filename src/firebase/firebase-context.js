import React, { useContext } from 'react';
import Firebase from './firebase';

const FirebaseContext = React.createContext(new Firebase());

export default FirebaseContext;

export const useFirebase = () => useContext(FirebaseContext);
