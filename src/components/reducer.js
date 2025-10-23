export const initialState = {
  currValue: '0',
  prevValue: null,
  operator: null,
  overwrite: false,
};

const calculate = (firstNum, secondNum, op) => {
  const a = parseFloat(firstNum)
  const b = parseFloat(secondNum)
  if (op === '+') return a + b;
  if (op === '-') return a - b;
  if (op === '*') return a * b;
  if (op === '/') return b !== 0 ? a / b : "Делить на ноль нельзя!";
}



export const reducer = (state, action) => {
  const { currValue, prevValue, operator, overwrite } = state;
  const { type } = action;
  if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(type)) {
    return { ...state, currValue: currValue === '0' ? type : currValue + type }
  }
  switch (type) {
    case 'C':
      return initialState;

    case '+':
    case '-':
    case '*':
    case '/':
      return { ...state, operator: type, overwrite: true, prevValue: currValue, currValue: '0' };


    case '=':
      return {
        ...state,
        currValue: calculate(prevValue, currValue, operator) || currValue,
        prevValue: null,
        operator: null,
        overwrite: false,
      }

    default:
      return state;
  }
};