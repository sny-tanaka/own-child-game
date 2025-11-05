export type EvolutionStep = {
  digimonId: number; // デジモンのID
  isEvolution: boolean; // true: 進化、false: 退化
  jogressPartnerId?: number; // ジョグレス進化の相方のID
};

export type EvolutionStepForShow = {
  digimonId: number; // デジモンのID
  digimonName: string; // デジモンの名前
  isEvolution: boolean; // true: 進化、false: 退化
  evolutionText: string; // 進化の説明テキスト
};

export type Digimon = {
  id: number;
  name: string;
  generation: number;
};

export type EvolutionRule = {
  from: number;
  to: number;
  isJogress: boolean;
};
