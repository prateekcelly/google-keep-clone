import React, { useContext, useState, useEffect } from 'react';
import EditIcon from '../icons/EditIcon';
import PaletteIcon from '../icons/PaletteIcon/PaletteIcon';
import styles from './Note.module.css';
import { FirebaseContext } from '../../firebase';
import ThemeContext from '../../theme';

const Note = (props) => {
  const firebase = useContext(FirebaseContext);
  const theme = useContext(ThemeContext);
  const [noteColor, setNoteColor] = useState(props.note.color);

  useEffect(() => {
    setNoteColor(props.note.color);
  }, [props]);

  function changeNoteColor(color) {
    firebase.updateNote(
      props.note.id,
      props.note.title,
      props.note.content,
      color,
    );
  }

  function openModal() {
    props.setSelectedNote(props.note);
    props.setModalOpen(true);
  }

  return (
    <div
      className={styles.note}
      onClick={openModal}
      style={{ backgroundColor: theme.paletteColors[noteColor] }}
    >
      {props.note.title !== '' || props.note.content !== '' ? (
        <section className={styles['note-information']}>
          <h1>{props.note.title}</h1>
          <pre>{props.note.content}</pre>
        </section>
      ) : (
        <div className={styles['empty-note']}>Empty Note</div>
      )}
      <div className={styles['panel']}>
        <button type="button" onClick={(e) => e.stopPropagation()}>
          <PaletteIcon
            changeNoteColor={changeNoteColor}
            note={props.note}
          />
        </button>
        <button type="button" className={styles.edit}>
          <EditIcon />
        </button>
      </div>
    </div>
  );
};

export default Note;
