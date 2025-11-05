import { useState } from 'react';

import styles from './style.module.scss';

import { Game } from '@/components/Game/Game';
import { Start } from '@/components/Start/Start';

export const Page = () => {
  const [started, setStarted] = useState(false);

  return (
    <div className={styles.container}>
      {started ? <Game /> : <Start onStart={() => setStarted(true)} />}
    </div>
  );
};
