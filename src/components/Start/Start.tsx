import styles from './style.module.scss';

type Props = {
  onStart: () => void;
};

export const Start = ({ onStart }: Props) => {
  return (
    <div className={styles.container}>
      <button
        onClick={onStart}
        className={styles.button}
      >
        Play
      </button>
    </div>
  );
};
