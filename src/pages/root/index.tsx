import styles from './style.module.scss';

import { PatchNote } from '@/components/common/PatchNote/PatchNote';
import { Digimon } from '@/components/digimon/Digimon';

export const Page = () => {
  return (
    <div className={styles.container}>
      <PatchNote />
      <Digimon />
    </div>
  );
};
