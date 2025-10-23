import styles from './Display.module.css';

const Display = ({ currValue }) => {
  return (
    <div className="calculator__display">
      <input
        className={styles.calculator__input}
        type="text"
        value={currValue}
        disabled
      />
    </div>
  );
};

export default Display;
