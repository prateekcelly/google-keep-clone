import React, {
  useContext,
  useReducer,
  useEffect,
  useState,
} from 'react';
import DeleteIcon from '../icons/DeleteIcon';
import PaletteIcon from '../icons/PaletteIcon';
import Palette from '../palette/Palette';
import autoExpand from '../../utils';
import { FirebaseContext } from '../../firebase';

import styles from './UpdateModal.module.css';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Grow from '@material-ui/core/Grow';
import ThemeContext from '../../theme';

const UpdateModal = (props) => {
  const firebase = useContext(FirebaseContext);
  const theme = useContext(ThemeContext);
  const [paletteVisible, setPaletteVisible] = useState(false);
  const [noteColor, setNoteColor] = useState(
    props.selectedNote.color,
  );

  useEffect(() => {
    setInput({
      title: props.selectedNote.title,
      content: props.selectedNote.content,
    });
    setNoteColor(props.selectedNote.color);
  }, [props]);

  const [input, setInput] = useReducer(
    (input, newInput) => ({ ...input, ...newInput }),
    {
      title: props.selectedNote.title,
      content: props.selectedNote.content,
    },
  );

  const contentRef = (node) => {
    if (!node) return;
    autoExpand(node, false);
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setInput({ [name]: value });
  }

  function updateNote(e) {
    e.stopPropagation();
    e.preventDefault();
    firebase.updateNote(
      props.selectedNote.id,
      input.title,
      input.content,
      noteColor,
      props.handleClose,
    );
  }

  function deleteNote(e) {
    e.stopPropagation();
    firebase.deleteNote(props.selectedNote.id, props.handleClose);
  }

  function showPalette() {
    setPaletteVisible(true);
  }

  function hidePalette() {
    setPaletteVisible(false);
  }

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      disableAutoFocus={true}
      className={styles.modal}
      open={props.modalOpen}
      onClose={updateNote}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ transitionDuration: 100 }}
    >
      <Grow in={props.modalOpen}>
        <form
          className={styles['edit-note']}
          onSubmit={updateNote}
          style={{
            backgroundColor: theme.paletteColors[noteColor],
          }}
        >
          <input
            id="transition-modal-title"
            value={input.title}
            name="title"
            onChange={handleChange}
            placeholder="Title"
          />
          <textarea
            onInput={(e) => autoExpand(e.target, false)}
            id="transition-modal-description"
            value={input.content}
            name="content"
            onChange={handleChange}
            placeholder="Note"
            ref={contentRef}
          ></textarea>
          <div className={styles['panel']}>
            <button type="button" onClick={deleteNote}>
              <DeleteIcon />
            </button>
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
                changeNoteColor={setNoteColor}
                paletteVisible={paletteVisible}
                showPalette={showPalette}
                hidePalette={hidePalette}
                noteColor={noteColor}
              />
            </button>
            <button type="submit">Done</button>
          </div>
        </form>
      </Grow>
    </Modal>
  );
};

export default UpdateModal;
