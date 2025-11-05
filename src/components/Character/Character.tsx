import styles from './style.module.scss';

type Props = {
  filename: string;
  onClick?: () => void;
  top?: number;
  left?: number;
};

export const Character = ({ filename, onClick, top, left }: Props) => {
  return (
    <img
      src={`/own-child-game/images/${filename}.png`}
      alt="Character"
      onClick={onClick}
      style={{
        top: `${top}%`,
        left: `${left}%`,
      }}
      className={styles.character}
    />
  );
};
