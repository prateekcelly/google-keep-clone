import React, {
  useContext,
  useState,
  useRef,
  useEffect,
  useReducer,
} from 'react';
import styles from './Create.module.css';
import { FirebaseContext } from '../../firebase';
import autoExpand from '../../utils';
import { paletteColors } from '../../theme/theme';

const INITIAL_STATE = { title: '', content: '' };

const Create = () => {
  const [input, setInput] = useReducer(
    (input, newInput) => ({ ...input, ...newInput }),
    INITIAL_STATE,
  );

  const [titleFieldVisible, setTitleFieldVisible] = useState(false);
  const firebase = useContext(FirebaseContext);
  const formNode = useRef();

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideFormClick);
    return () => {
      document.removeEventListener(
        'mousedown',
        handleOutsideFormClick,
      );
    };
  });

  function handleOutsideFormClick(e) {
    if (formNode.current.contains(e.target)) {
      return;
    } else {
      hideTitleField();
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const title = e.target.title.value;
    const content = e.target.content.value;
    if (title.trim() || content.trim()) {
      firebase.createNote(title, content, paletteColors.snowWhite);
      setInput({ title: '', content: '' });
      autoExpand(e.target.title, true);
      autoExpand(e.target.content, true);
      hideTitleField();
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setInput({ [name]: value });
  }

  function showTitleField() {
    setTitleFieldVisible(true);
  }

  function hideTitleField() {
    setTitleFieldVisible(false);
  }

  return (
    <form
      className={`${styles['create-note']} ${
        titleFieldVisible ? styles['open-form'] : ''
      }`}
      onSubmit={handleSubmit}
      ref={formNode}
    >
      {titleFieldVisible && (
        <input
          value={input.title}
          name="title"
          onChange={handleChange}
          placeholder="Title"
        ></input>
      )}
      <textarea
        onInput={(e) => autoExpand(e.target, false)}
        value={input.content}
        name="content"
        onChange={handleChange}
        placeholder="Take a note..."
        row="1"
        onFocus={showTitleField}
      ></textarea>
      {titleFieldVisible && <button type="submit">+</button>}
    </form>
  );
};

export default Create;
