import React, { useState, useContext, useEffect } from 'react';
import styles from './Notes.module.css';
import Masonry from 'react-masonry-css';
import Note from '../note/Note';
import { FirebaseContext } from '../../firebase';

const breakpointColumnsObj = {
  default: 5,
  1000: 4,
  800: 3,
  600: 2,
  400: 1,
};

const Notes = (props) => {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredInput] = useState([]);
  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    firebase.getNotes((snapshot) => {
      let fetchedNotes = snapshot.val();
      if (fetchedNotes === null) fetchedNotes = [];
      setNotes(
        Object.keys(fetchedNotes)
          .map((i) => fetchedNotes[i])
          .reverse(),
      );
    });
  }, [firebase]);

  useEffect(() => {
    const filteredNotes = notes.filter((note) => {
      if (props.searchInput) {
        const title = note.title.toLowerCase();
        const content = note.content.toLowerCase();
        const search = props.searchInput.toLowerCase();
        return (
          title.indexOf(search) !== -1 ||
          content.indexOf(search) !== -1
        );
      }
      return true;
    });
    setFilteredInput(filteredNotes);
  }, [props.searchInput, notes]);

  return notes.length ? (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className={styles['masonry-grid']}
      columnClassName={styles['masonry-grid-column']}
    >
      {filteredNotes.map((note) => (
        <Note
          note={note}
          key={note.id}
          setSelectedNote={props.setSelectedNote}
          setModalOpen={props.setModalOpen}
        />
      ))}
    </Masonry>
  ) : (
    <div className={styles['zero-notes']}>
      Notes you add appear here
    </div>
  );
};

export default Notes;
