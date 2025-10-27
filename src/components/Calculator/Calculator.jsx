import Display from '../Display/Display';
import Keyboard from '../Keyboard/Keyboard';
import styles from './Calculator.module.css';
import { useDisplayValue } from '../../hooks/useDisplayValue';

const Calculator = () => {
  const [displayValue, handleClick] = useDisplayValue();

  return (
    <div className={styles.calculator}>
      <Display displayValue={displayValue} />
      <Keyboard handleClick={handleClick} />
    </div>
  );
};

export default Calculator;
