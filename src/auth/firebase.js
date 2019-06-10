import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATA_BASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);

    this.auth = app.auth();
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  currentUser = () => this.auth.currentUser;

  isLoggedIn = () => this.auth.currentUser !== null;

  /**
   *  Fetch API
   */

  firestore = () => app.firestore();

  getGames = () => app.firestore().collection('/games');

  getGame = uid => app.firestore().doc(`/games/${uid}`);

  getLocations = () => app.firestore().collection('/locations');

  getLocation = uid => app.firestore().doc(`/locations/${uid}`);

  getUsers = () => app.firestore().collection('/users');

  getUser = uid => app.firestore().doc(`/users/${uid}`);
}

export default Firebase;
