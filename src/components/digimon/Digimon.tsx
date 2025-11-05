import { useCallback, useState } from 'react';

import { Checkbox } from '@mui/material';

import { DigimonAutoComplete } from './DigimonAutoComplete/DigimonAutoComplete';
import { DigimonCgImage } from './DigimonCgImage/DigimonCgImage';
import styles from './style.module.scss';

import { DIGIMON_LIST } from '@/constants';
import { convertStepForShow } from '@/logics/convertStepForShow/convertStepForShow';
import { findEvolutionPath } from '@/logics/findEvolutionPath/findEvolutionPath';
import { EvolutionStepForShow } from '@/types/digimon';

type EvolutionBlock = EvolutionStepForShow[];

export const Digimon = () => {
  const [fromDigimonIds, setFromDigimonIds] = useState([DIGIMON_LIST[0].id]);
  const [toDigimonId, setToDigimonId] = useState(DIGIMON_LIST[0].id);
  const [evolutionBlocks, setEvolutionBlocks] = useState<EvolutionBlock[]>([]);
  const [excludeJogress, setExcludeJogress] = useState(false);

  const onClickFindPath = useCallback(() => {
    const newEvolutionBlocks: EvolutionBlock[] = [];
    for (const fromDigimonId of fromDigimonIds) {
      const path = findEvolutionPath(fromDigimonId, toDigimonId, excludeJogress);
      const convertedPath: EvolutionStepForShow[] = path.map(convertStepForShow);
      newEvolutionBlocks.push(convertedPath);
    }
    setEvolutionBlocks(newEvolutionBlocks);
  }, [fromDigimonIds, toDigimonId, excludeJogress, setEvolutionBlocks]);

  return (
    <div className={styles.container}>
      <div className={styles.inputArea}>
        <div className={styles.comboboxContainer}>
          <DigimonAutoComplete
            label="元デジモン"
            defaultValue={fromDigimonIds}
            onChange={setFromDigimonIds}
            multiple
          />
          <DigimonCgImage
            digimonId={fromDigimonIds[0]}
            width={52}
            height={52}
          />
        </div>
        <div className={styles.comboboxContainer}>
          <DigimonAutoComplete
            label="進化先デジモン"
            defaultValue={toDigimonId}
            onChange={(ids) => setToDigimonId(ids[0])}
          />
          <DigimonCgImage
            digimonId={toDigimonId}
            width={52}
            height={52}
          />
        </div>
        <label className={styles.checkboxContainer}>
          <Checkbox
            className={styles.checkbox}
            checked={excludeJogress}
            onChange={(e) => setExcludeJogress(e.target.checked)}
          />
          <div>ジョグレス進化をルートから除外</div>
        </label>
        <button
          className={styles.button}
          onClick={onClickFindPath}
        >
          経路を計算
        </button>
      </div>
      <div className={styles.resultContainer}>
        {evolutionBlocks.length > 0 && (
          <div className={styles.resultArea}>
            {evolutionBlocks.map((block, blockIndex) => {
              if (block.length === 0) {
                return (
                  <div
                    className={styles.resultBlock}
                    key={blockIndex}
                  >
                    その進化ルートは見つかりませんでした
                  </div>
                );
              }
              return (
                <div
                  className={styles.resultBlock}
                  key={blockIndex}
                >
                  {block.map((step, index) => {
                    return (
                      <>
                        {index > 0 && (
                          <div className={step.isEvolution ? styles.evolution : styles.devolution}>
                            &emsp;↓[{step.evolutionText}]
                          </div>
                        )}
                        <div className={styles.evolutionStepRow}>
                          <DigimonCgImage
                            digimonId={step.digimonId}
                            width={24}
                            height={24}
                          />
                          <div>{step.digimonName}</div>
                        </div>
                      </>
                    );
                  })}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
