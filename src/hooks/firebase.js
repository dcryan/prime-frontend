import { useState, useEffect } from 'react';
import { useFirebase } from '../firebase';
import { useUser } from '../session';

export function useCollectionWithQuery(query) {
  // initialize our default state
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [collection, setCollection] = useState(null);

  // when the id attribute changes (including mount)
  // subscribe to the collection and update
  // our state when it changes.
  useEffect(() => {
    const unsubscribe = query.onSnapshot(
      snapshot => {
        const collectionList = [];
        snapshot.forEach(doc => {
          collectionList.push(doc);
        });
        setLoading(false);
        setCollection(collectionList);
      },
      err => {
        setError(err);
      }
    );

    console.log('useCollectionWithQuery');

    // returning the unsubscribe function will ensure that
    // we unsubscribe from collection changes when our id
    // changes to a different value.
    return () => unsubscribe();
  }, [query]);

  return {
    error,
    loading,
    collection,
  };
}

export function useCollection(path) {
  const firebase = useFirebase();
  // initialize our default state
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [collection, setCollection] = useState(null);

  // when the id attribute changes (including mount)
  // subscribe to the collection and update
  // our state when it changes.
  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection(path)
      .onSnapshot(
        snapshot => {
          const collectionList = [];
          snapshot.forEach(doc => {
            collectionList.push(doc);
          });
          setLoading(false);
          setCollection(collectionList);
        },
        err => {
          setError(err);
        }
      );

    console.log('useCollection');

    // returning the unsubscribe function will ensure that
    // we unsubscribe from collection changes when our id
    // changes to a different value.
    return () => unsubscribe();
  }, [firebase, path]);

  return {
    error,
    loading,
    collection,
  };
}

export function useCollectionFiltered(path) {
  const firebase = useFirebase();
  const currentUser = useUser();
  // initialize our default state
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [collection, setCollection] = useState(null);

  // when the id attribute changes (including mount)
  // subscribe to the collection and update
  // our state when it changes.
  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection(path)
      .where('teamId', '==', currentUser.user.teamId)
      .onSnapshot(
        snapshot => {
          const collectionList = [];
          snapshot.forEach(doc => {
            collectionList.push(doc);
          });
          setLoading(false);
          setCollection(collectionList);
        },
        err => {
          setError(err);
        }
      );

    console.log('useCollectionFiltered');

    // returning the unsubscribe function will ensure that
    // we unsubscribe from collection changes when our id
    // changes to a different value.
    return () => unsubscribe();
  }, [currentUser.user.teamId, firebase, path]);

  return {
    error,
    loading,
    collection,
  };
}

export function useDocumentData(path) {
  const firebase = useFirebase();
  // initialize our default state
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [document, setDocument] = useState(null);

  // when the id attribute changes (including mount)
  // subscribe to the document and update
  // our state when it changes.
  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .doc(path)
      .onSnapshot(
        doc => {
          setLoading(false);
          setDocument(doc.data());
        },
        err => {
          setError(err);
        }
      );

    console.log('useDocumentData');

    // returning the unsubscribe function will ensure that
    // we unsubscribe from document changes when our id
    // changes to a different value.
    return () => unsubscribe();
  }, [firebase, path]);

  return {
    error,
    loading,
    document,
  };
}

export const useAuth = () => {
  const firebase = useFirebase();
  const [state, setState] = useState(() => ({
    initializing: true,
    userId: null,
    user: null,
  }));

  useEffect(() => {
    // listen for auth state changes
    const unsubscribe = firebase.doOnAuthStateChanged(async currentUser => {
      if (!currentUser) {
        setState({ initializing: false, userId: null, user: null });
        return;
      }

      const user = await firebase
        .firestore()
        .collection('users')
        .doc(currentUser.uid)
        .get();

      setState({ initializing: false, userId: user.uid, user: user.data() });
    });

    // unsubscribe to the listener when unmounting
    return () => unsubscribe();
  }, [firebase]);

  return state;
};
