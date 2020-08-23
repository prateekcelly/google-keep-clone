import React, { useContext } from 'react';

import styles from './Palette.module.css';
import ThemeContext from '../../theme';

const Palette = ({
  paletteVisible,
  showPalette,
  hidePalette,
  changeNoteColor,
}) => {
  const theme = useContext(ThemeContext);
  return (
    <div
      className={
        paletteVisible ? styles.palette : styles['hide-palette']
      }
      onMouseEnter={showPalette}
      onMouseLeave={hidePalette}
    >
      <div
        className={styles.color}
        style={{
          backgroundColor: theme.paletteColors.default,
          border: `2px solid ${theme.paletteColors.grey}`,
        }}
        onClick={() => changeNoteColor('default')}
      ></div>
      <div
        className={styles.color}
        style={{ backgroundColor: theme.paletteColors.red }}
        onClick={() => changeNoteColor('red')}
      ></div>
      <div
        className={styles.color}
        style={{ backgroundColor: theme.paletteColors.blue }}
        onClick={() => changeNoteColor('blue')}
      ></div>
      <div
        className={styles.color}
        style={{ backgroundColor: theme.paletteColors.green }}
        onClick={() => changeNoteColor('green')}
      ></div>
      <div
        className={styles.color}
        style={{ backgroundColor: theme.paletteColors.grey }}
        onClick={() => changeNoteColor('grey')}
      ></div>
      <div
        className={styles.color}
        style={{ backgroundColor: theme.paletteColors.yellow }}
        onClick={() => changeNoteColor('yellow')}
      ></div>
    </div>
  );
};

export default Palette;
