import { useState } from 'react';
import styles from './style.module.scss';
import { Start } from '@/components/Start/Start';
import { Game } from '@/components/Game/Game';

export const Page = () => {
  const [started, setStarted] = useState(false);

  return (
    <div className={styles.container}>
      {started ? <Game /> : <Start onStart={() => setStarted(true)} />}
    </div>
  );
};
