import styles from './Button.module.css';

const Button = (props) => {
  const { children, handleClick } = props;
  console.log('render Button');

  return (
    <button
      className={styles.button}
      onClick={() => handleClick(children)}>
      {children}
    </button>
  );
};

export default Button;
