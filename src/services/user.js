import app from 'firebase/app';
import 'firebase/firestore';

export default class User {
  static createUser(uid, member) {
    app.firestore.doc(`users/${uid}`).set(member);
  }

  static getUser(uid) {
    app.firestore.doc(`users/${uid}`).get();
  }
}
