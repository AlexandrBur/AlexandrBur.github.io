import styles from './Button.module.css';

const Button = ({ children, handleClick }) => {
  return (
    <button
      className={styles.button}
      onClick={() => handleClick(children)}>
      {children}
    </button>
  );
};

export default Button;
