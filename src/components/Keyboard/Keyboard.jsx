import { memo } from 'react';
import { labels } from '../../utils/keyboardLayout.js';
import Button from '../Button/Button';
import styles from './Keyboard.module.css';

const Keyboard = memo((props) => {
  const { handleClick } = props;
  console.log('render Keyboard');
  return (
    <div className={styles.calculator__keyboard}>
      {labels.map((label) => (
        <Button
          key={label}
          handleClick={handleClick}>
          {label}
        </Button>
      ))}
    </div>
  );
});

export default Keyboard;
