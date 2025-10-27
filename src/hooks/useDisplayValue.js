import { useCallback, useReducer } from "react";
import { initialState, reducer } from '../reducer/calculatorReducer'

export const useDisplayValue = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleClick = useCallback((label) => {
    dispatch({ type: label });
  }, [])

  // Форматируем результат для отображения
  let displayValue = state.prevValue && state.currValue === '0' && state.operator
    ? state.prevValue
    : state.currValue;

  // Убираем лишние нули и .0 в конце чисел
  if (!isNaN(parseFloat(displayValue))) {
    displayValue = parseFloat(displayValue).toString();
  }

  console.log(state);
  return [displayValue, handleClick]
}
