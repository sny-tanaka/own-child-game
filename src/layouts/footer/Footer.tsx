import styles from './style.module.scss';

export const Footer = () => {
  return (
    <div className={styles.footer}>
      <div>produced by tanashun</div>
      <div className={styles.inquiry}>
        ご意見やご要望は
        <img
          className={styles.x_icon}
          src="/digimon-time-stranger-evolutions/x_icon.png"
        />
        <a
          href="https://x.com/tanashund30299?s=21&t=FDZMTl8DWbkcyEYG3FhPJw"
          target="_blank"
          rel="noreferrer"
        >
          tanashun_dev
        </a>
        までお願いします
      </div>
    </div>
  );
};
