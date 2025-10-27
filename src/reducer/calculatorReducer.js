export const initialState = {
  currValue: '0',
  prevValue: null,
  operator: null,
  overwrite: false,
};

const calculate = (firstNum, secondNum, op) => {
  const a = parseFloat(firstNum)
  const b = parseFloat(secondNum)
  if (op === '+') return (a + b).toString();
  if (op === '-') return (a - b).toString();
  if (op === '*') return (a * b).toString();
  if (op === '/') return b !== 0 ? (a / b).toString() : 'Error! Деление на "0" ';
}



export const reducer = (state, action) => {
  const { currValue, prevValue, operator, overwrite } = state;
  const { type } = action;

  if (/[0-9]/.test(type)) {
    if (overwrite) {
      return { ...state, currValue: type, overwrite: false }
    }

    if (currValue === '0' && type === '0') {
      return state;
    }

    if (currValue === '0') {
      return { ...state, currValue: type }
    }

    return { ...state, currValue: currValue + type }
  }

  switch (type) {
    case 'C':
      return initialState;

    case '+':
    case '-':
    case '*':
    case '/':
      if (!prevValue) {
        return {
          ...state,
          operator: type,
          prevValue: currValue,
          currValue: '0',
          overwrite: true,
        }
      } else if (operator && !overwrite) {
        const result = calculate(prevValue, currValue, operator)
        return {
          ...state,
          operator: type,
          prevValue: result,
          currValue: '0',
          overwrite: true,
        }
      }
      return { ...state, operator: type, overwrite: true }

    case '<<<':
      const curr = state.currValue.slice(0, length - 1)
      return {
        ...state,
        currValue: curr.length > 0 ? curr : '0',
      }

    case '.':
      if (overwrite) {
        return { ...state, currValue: '0.', overwrite: false };
      }
      if (currValue.includes('.')) {
        return state; // Игнорируем, если точка уже есть
      }
      return { ...state, currValue: currValue + '.' };

    case '+/-':
      if (currValue === '0' || currValue === 'Error! Деление на 0') {
        return state; // Нельзя менять знак у 0 или ошибки
      }
      return {
        ...state,
        currValue: (parseFloat(currValue) * -1).toString(),
      };

    case '%':
      if (!prevValue || !operator) {
        return state; // Игнорируем, если нет предыдущего значения или оператора
      }
      const percentValue = (parseFloat(prevValue) * (parseFloat(currValue) / 100)).toString();
      if (operator) {
        const result = calculate(prevValue, percentValue, operator);
        return {
          ...state,
          currValue: result,
          prevValue: null,
          operator: null,
          overwrite: true,
        };
      }
      return { ...state, currValue: percentValue, overwrite: true };

    case '=':
      if (!prevValue || !operator) {
        return state;
      }

      const result = calculate(prevValue, currValue, operator);
      return {
        ...state,
        currValue: result,
        prevValue: null,
        operator: null,
        overwrite: true,
      }

    default:
      return state;
  }
};
