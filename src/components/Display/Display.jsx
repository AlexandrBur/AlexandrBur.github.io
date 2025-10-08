import styles from './Display.module.css';

const Display = () => {
  return (
    <div className="calculator__display">
      <input className={styles.calculator__input} type="text" value={0} disabled />
    </div>
  );
};

export default Display;
