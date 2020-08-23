import React, { useContext, useState, useEffect } from 'react';
import EditIcon from '../icons/EditIcon';
import PaletteIcon from '../icons/PaletteIcon';
import Palette from '../palette/Palette';
import styles from './Note.module.css';
import { FirebaseContext } from '../../firebase';
import ThemeContext from '../../theme';

const Note = (props) => {
  const firebase = useContext(FirebaseContext);
  const theme = useContext(ThemeContext);
  const [noteColor, setNoteColor] = useState(props.note.color);
  const [paletteVisible, setPaletteVisible] = useState(false);

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

  function showPalette() {
    setPaletteVisible(true);
  }

  function hidePalette() {
    setPaletteVisible(false);
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
        <button
          type="button"
          onClick={(e) => e.stopPropagation()}
          className={styles['palette-button']}
        >
          <PaletteIcon
            showPalette={showPalette}
            hidePalette={hidePalette}
          />
          <Palette
            changeNoteColor={changeNoteColor}
            paletteVisible={paletteVisible}
            showPalette={showPalette}
            hidePalette={hidePalette}
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
