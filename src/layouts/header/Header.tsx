import styles from './style.module.scss';

export const Header = () => {
  return (
    <div className={styles.header}>
      <img
        className={styles.img}
        src="/digimon-time-stranger-evolutions/bg.webp"
      />
      <div className={styles.text}>
        <div>デジモンストーリー</div>
        <div>タイムストレンジャー</div>
        <div>進化ルート計算ツール</div>
      </div>
      <div className={styles.version}>ver1.0.7</div>
    </div>
  );
};
