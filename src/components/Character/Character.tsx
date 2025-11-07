import styles from './style.module.scss';

type Props = {
  filename: string;
  onClick?: () => void;
  onAnimationEnd?: () => void;
  top: number;
  left: number;
};

export const Character = ({ filename, onClick, top, left, onAnimationEnd }: Props) => {
  console.log({ filename, top, left });
  return (
    <div
      className={styles.container}
      style={{
        top: top - 100,
        left: left - 100,
      }}
    >
      <img
        src={`/own-child-game/images/${filename}.png`}
        alt="Character"
        onClick={onClick}
        onAnimationEnd={onAnimationEnd}
        className={styles.character}
      />
    </div>
  );
};
