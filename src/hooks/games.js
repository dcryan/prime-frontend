import React, { useEffect } from 'react';
import { useFirebase } from '../auth';

export function useGames() {
  const firebase = useFirebase();
  // initialize our default state
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [games, setGames] = React.useState(null);

  // when the id attribute changes (including mount)
  // subscribe to the games collection and update
  // our state when it changes.
  useEffect(() => {
    const unsubscribe = firebase.getGames().onSnapshot(
      snapshot => {
        const gamesList = [];
        snapshot.forEach(doc => {
          gamesList.push(doc);
        });
        setLoading(false);
        setGames(gamesList);
      },
      err => {
        setError(err);
      }
    );

    // returning the unsubscribe function will ensure that
    // we unsubscribe from document changes when our id
    // changes to a different value.
    return () => unsubscribe();
  }, [firebase]);

  return {
    error,
    loading,
    games,
  };
}
