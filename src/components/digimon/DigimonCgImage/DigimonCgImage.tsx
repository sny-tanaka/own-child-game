import { useEffect, useState } from 'react';

type Props = {
  digimonId: number;
  width: number;
  height: number;
};

export const DigimonCgImage = ({ digimonId, width, height }: Props) => {
  const [hasError, setHasError] = useState(false);

  // digimonIdを3桁のゼロ埋めに変換
  const digimonIdPadded = String(digimonId).padStart(3, '0');

  useEffect(() => {
    setHasError(false);
  }, [digimonId]);

  if (hasError) {
    return (
      <img
        width={width}
        height={height}
        src="/digimon-time-stranger-evolutions/placeholder.webp"
      />
    );
  }
  return (
    <img
      width={width}
      height={height}
      src={`/digimon-time-stranger-evolutions/digimons/cg/${digimonIdPadded}.webp`}
      onError={() => setHasError(true)}
    />
  );
};
