import React, { useState, useEffect } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';

import './App.css';
import './styles/main.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

import Notes from './components/notes/Notes';
import CreateNoteForm from './components/create/Create';
import UpdateModal from './components/update-modal/UpdateModal';
import HeaderBar from './components/headerbar/HeaderBar';
import ThemeContext, { lightTheme, darkTheme } from './theme';
import useDarkMode from './utils/useDarkMode';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

function App() {
  const [selectedNote, setSelectedNote] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [computedStyle, setComputedStyle] = useState({});
  const [themeState, setThemeState] = useDarkMode();
  const [searchInput, setSearchInput] = useState();

  useEffect(() => {
    setComputedStyle(themeState.dark ? darkTheme : lightTheme);
    Object.keys(computedStyle).forEach((key) => {
      const value = computedStyle[key];
      if (typeof value !== 'object') {
        document.documentElement.style.setProperty(key, value);
      }
    });
  }, [themeState, computedStyle]);

  function changeTheme() {
    const dark = !themeState.dark;
    localStorage.setItem('dark', JSON.stringify(dark));
    setThemeState({ ...themeState, dark });
  }

  const handleClose = () => {
    setModalOpen(false);
    setSelectedNote(null);
  };

  const classes = useStyles();
  if (!themeState.hasThemeLoaded)
    return (
      <div className={classes.root}>
        <CircularProgress color="secondary" />
      </div>
    );

  return (
    <ThemeContext.Provider value={computedStyle}>
      <div className="App">
        <HeaderBar
          themeState={themeState}
          changeTheme={changeTheme}
          setSearchInput={setSearchInput}
        />
        <CreateNoteForm />
        <Notes
          setSelectedNote={setSelectedNote}
          setModalOpen={setModalOpen}
          searchInput={searchInput}
        />
        <CSSTransitionGroup
          transitionName="modal"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          {selectedNote && (
            <UpdateModal
              selectedNote={selectedNote}
              modalOpen={modalOpen}
              handleClose={handleClose}
            />
          )}
        </CSSTransitionGroup>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
