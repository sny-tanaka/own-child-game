import { EVOLUTION_RULES } from '@/constants';
import { getJogressPartner } from '@/logics/getJogressPartner/getJogressPartner';
import { EvolutionStep } from '@/types/digimon';

const BFS_MAX_DEPTH = 20;

type BFS_QUEUE_ITEM = {
  currentId: number;
  path: EvolutionStep[];
  depth: number;
};

export const findEvolutionPath = (
  fromId: number,
  toId: number,
  excludeJogress: boolean
): EvolutionStep[] => {
  // 0は未選択
  if (fromId === 0 || toId === 0) {
    return [];
  }
  // 同じIDの場合は即座に返す
  if (fromId === toId) {
    return [];
  }

  // BFS用のキュー: {現在のID, 経路, 深さ}
  const queue: BFS_QUEUE_ITEM[] = [
    {
      currentId: fromId,
      path: [{ digimonId: fromId, isEvolution: false }],
      depth: 0,
    },
  ];

  const visited = new Set<number>();
  visited.add(fromId);

  while (queue.length > 0) {
    const { currentId, path, depth } = queue.shift()!;

    // 深さ制限チェック
    if (depth >= BFS_MAX_DEPTH) continue;

    // 退化先を探索
    const devolutions = EVOLUTION_RULES.filter((rule) => rule.to === currentId);
    for (const devolution of devolutions) {
      const evStep: EvolutionStep = {
        digimonId: devolution.from,
        isEvolution: false,
      };
      if (devolution.from === toId) {
        // 見つかった！
        const finalPath = [...path, evStep];
        return finalPath;
      }
      // 未訪問なら探索継続
      if (!visited.has(devolution.from)) {
        visited.add(devolution.from);
        queue.push({
          currentId: devolution.from,
          path: [...path, evStep],
          depth: depth + 1,
        });
      }
    }

    // 進化先を探索
    const evolutions = EVOLUTION_RULES.filter((rule) => rule.from === currentId);
    for (const evolution of evolutions) {
      const evStep: EvolutionStep = {
        digimonId: evolution.to,
        isEvolution: true,
      };
      if (evolution.isJogress) {
        if (excludeJogress) {
          // ジョグレス進化を除外する設定ならスキップ
          continue;
        }
        const partnerId = getJogressPartner(evolution.to, currentId);
        evStep.jogressPartnerId = partnerId;
        // ジョグレス進化の相方が進化先デジモンに指定されている場合はスキップ
        if (partnerId === toId) {
          continue;
        }
      }
      if (evolution.to === toId) {
        // 見つかった！
        const finalPath = [...path, evStep];
        return finalPath;
      }
      // 未訪問なら探索継続
      if (!visited.has(evolution.to)) {
        visited.add(evolution.to);
        queue.push({
          currentId: evolution.to,
          path: [...path, evStep],
          depth: depth + 1,
        });
      }
    }
  }

  // 見つからなかった場合
  return [];
};
