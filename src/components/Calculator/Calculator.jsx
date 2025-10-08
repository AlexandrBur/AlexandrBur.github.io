import Display from '../Display/Display';
import Keyboard from '../Keyboard/Keyboard';
import styles from './Calculator.module.css';

const Calculator = () => {
  return (
    <div className={styles.calculator}>
      <Display />
      <Keyboard />
    </div>
  );
};

export default Calculator;
