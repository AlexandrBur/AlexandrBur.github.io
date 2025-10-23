import lables from '../../utils/getLables';
import Button from '../Button/Button';
import styles from './Keyboard.module.css';

const Keyboard = ({ handleClick }) => {
  return (
    <div className={styles.calculator__keyboard}>
      {lables.map((elem) => (
        <Button
          key={elem}
          handleClick={handleClick}>
          {elem}
        </Button>
      ))}
    </div>
  );
};

export default Keyboard;
