import React from 'react';

import styles from './HeaderBar.module.css';
import Switch from '@material-ui/core/Switch';
import { makeStyles } from '@material-ui/core/styles';

import { DebounceInput } from 'react-debounce-input';

const useStyles = makeStyles({
  root: {
    width: '58px',
    height: '38px',
    position: 'absolute',
    color: '#fff',
    right: '15px',
    top: '10px',
    display: 'inline-flex',
    padding: '12px',
    overflow: 'hidden',
    boxSizing: 'border-box',
    flexShrink: '0',
    verticalAlign: 'middle',
  },
});

const HeaderBar = (props) => {
  const classes = useStyles();

  return (
    <div className={styles.header}>
      <DebounceInput
        debounceTimeout={300}
        element="input"
        placeholder="Search"
        onChange={(e) => props.setSearchInput(e.target.value)}
      />
      <Switch
        className={`${styles.switch} ${classes.root}`}
        checked={props.themeState.dark}
        onClick={props.changeTheme}
      />
    </div>
  );
};

export default HeaderBar;
