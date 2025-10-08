import lables from '../../utils/lables';
import Button from '../Button/Button';
import styles from './Keyboard.module.css';

const Keyboard = () => {
  return (
    <div className={styles.calculator__keyboard}>
      {lables.map((elem) => (
        <Button key={elem}>{elem}</Button>
      ))}
    </div>
  );
};

export default Keyboard;
