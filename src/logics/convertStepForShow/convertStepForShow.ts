import { DIGIMON_LIST } from '@/constants';
import { EvolutionStep, EvolutionStepForShow } from '@/types/digimon';

export const convertStepForShow = (step: EvolutionStep): EvolutionStepForShow => {
  const name = DIGIMON_LIST.find((d) => d.id === step.digimonId)?.name || '???';
  let evText = step.isEvolution ? '進化' : '退化';
  if (step.jogressPartnerId !== undefined) {
    const partnerName = DIGIMON_LIST.find((d) => d.id === step.jogressPartnerId)?.name || '???';
    evText = `ジョグレス進化: ${partnerName}`;
  }

  return {
    digimonId: step.digimonId,
    digimonName: name,
    isEvolution: step.isEvolution,
    evolutionText: evText,
  };
};
