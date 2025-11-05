import styles from './style.module.scss';

type Props = {
  onStart: () => void;
};

export const Start = ({ onStart }: Props) => {
  return (
    <div className={styles.container}>
      <img
        src="/own-child-game/logo512.png"
        alt="logo"
        className={styles.img}
      />
      <div className={styles.buttonContainer}>
        <button
          onClick={onStart}
          className={styles.button}
        >
          Play!
        </button>
      </div>
    </div>
  );
};
