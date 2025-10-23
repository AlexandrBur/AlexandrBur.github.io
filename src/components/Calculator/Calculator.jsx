import { useReducer, useState } from 'react';
import Display from '../Display/Display';
import Keyboard from '../Keyboard/Keyboard';
import styles from './Calculator.module.css';
import { initialState, reducer } from '../reducer';

const Calculator = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleClick = (elem) => {
    dispatch({ type: elem });
  };

  console.log(state);

  return (
    <div className={styles.calculator}>
      <Display currValue={state.currValue} />
      <Keyboard handleClick={handleClick} />
    </div>
  );
};

export default Calculator;
