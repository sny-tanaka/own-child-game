import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';

import styles from './style.module.scss';

export const PatchNote = () => {
  return (
    <Accordion className={styles.accordion}>
      <AccordionSummary>パッチノート</AccordionSummary>
      <AccordionDetails>
        <ul>
          <li>
            <h6>ver1.07</h6>
            <div>元デジモンを複数選択可能にする</div>
          </li>
          <li>
            <h6>ver1.06</h6>
            <div>デジモン画像の追加</div>
          </li>
          <li>
            <h6>ver1.05</h6>
            <div>ひらがなでも検索できるようになりました</div>
          </li>
          <li>
            <h6>ver1.04</h6>
            <div>進化より退化を優先するようにロジック修正</div>
          </li>
          <li>
            <h6>ver1.03</h6>
            <div>ジョグレス進化ルートを除外する機能を追加</div>
          </li>
          <li>
            <h6>ver1.02</h6>
            <div>
              進化ルートに進化先デジモンを素材にしたジョグレス進化が候補になってしまう問題の修正
            </div>
          </li>
          <li>
            <h6>ver1.01</h6>
            <div>デザイン変更</div>
          </li>
          <li>
            <h6>ver1.00</h6>
            <div>公開</div>
          </li>
        </ul>
      </AccordionDetails>
    </Accordion>
  );
};
