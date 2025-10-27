import styles from './Display.module.css';

const Display = (props) => {
  const { displayValue } = props;
  console.log('render Display');
  return (
    <input
      className={styles.calculator__display}
      type="text"
      value={displayValue}
      disabled
      readOnly
    />
  );
};

export default Display;
