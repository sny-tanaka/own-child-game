import { EVOLUTION_RULES } from '@/constants';

export const getJogressPartner = (toId: number, excludeId: number): number | undefined => {
  const partnerRule = EVOLUTION_RULES.find(
    (rule) => rule.isJogress && rule.to === toId && rule.from !== excludeId
  );
  return partnerRule ? partnerRule.from : undefined;
};
