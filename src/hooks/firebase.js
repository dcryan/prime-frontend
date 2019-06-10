import React, { useEffect } from 'react';
import { useFirebase } from '../auth';

export function useCollection(path) {
  const firebase = useFirebase();
  // initialize our default state
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [collection, setCollection] = React.useState(null);

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

export function useDocument(path) {
  const firebase = useFirebase();
  // initialize our default state
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [document, setDocument] = React.useState(null);

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
          setDocument(doc);
        },
        err => {
          setError(err);
        }
      );

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
