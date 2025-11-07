import { useEffect, useState } from 'react';

import styles from './style.module.scss';

import { Character } from '@/components/Character/Character';

type CharacterType = {
  filename: string;
  top: number;
  left: number;
};

const CHARACTER_LIST = [
  'anpanman',
  'shokupanman',
  'currypanman',
  'baikinman',
  'dokinchan',
  'kokinchan',
  'creampanda',
  'akachanman',
];

const SOUND_LIST = ['kira', 'pa', 'peta'];

export const Game = () => {
  const [availableCharacters, setAvailableCharacters] = useState(CHARACTER_LIST);
  const [character1, setCharacter1] = useState<CharacterType | null>(null);
  const [character2, setCharacter2] = useState<CharacterType | null>(null);
  const [character3, setCharacter3] = useState<CharacterType | null>(null);
  const [character4, setCharacter4] = useState<CharacterType | null>(null);
  const [character5, setCharacter5] = useState<CharacterType | null>(null);

  const handleAnimationEnd = (
    filename: string,
    setCharacter: React.Dispatch<React.SetStateAction<CharacterType | null>>
  ) => {
    setAvailableCharacters((prev) => [...prev, filename]);
    setCharacter(null);
  };

  const popCharacter = (x: number, y: number) => {
    // タッチされた座標にキャラクターを出現させる
    if (character1 && character2 && character3 && character4 && character5) {
      return;
    }
    const filename = availableCharacters[Math.floor(Math.random() * availableCharacters.length)];
    setAvailableCharacters((prev) => prev.filter((name) => name !== filename));
    if (!character1) {
      setCharacter1({ filename, top: y, left: x });
    } else if (!character2) {
      setCharacter2({ filename, top: y, left: x });
    } else if (!character3) {
      setCharacter3({ filename, top: y, left: x });
    } else if (!character4) {
      setCharacter4({ filename, top: y, left: x });
    } else if (!character5) {
      setCharacter5({ filename, top: y, left: x });
    }
    // 効果音再生
    const soundFilename = SOUND_LIST[Math.floor(Math.random() * SOUND_LIST.length)];
    const audio = new Audio(`/own-child-game/sounds/${soundFilename}.mp3`);
    audio.play().catch((error) => {
      console.error('効果音の再生に失敗しました:', error);
    });
  };

  const onTouchScreen = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    popCharacter(x, y);
  };

  // BGM再生
  useEffect(() => {
    const audio = new Audio('/own-child-game/musics/anpanman_march.mp3');
    audio.loop = true;
    audio.play().catch((error) => {
      console.error('BGMの再生に失敗しました:', error);
    });
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  return (
    <div
      className={styles.container}
      onClick={onTouchScreen}
    >
      <div className={styles.touch}>TOUCH!</div>
      {character1 && (
        <Character
          key={1}
          filename={character1.filename}
          top={character1.top}
          left={character1.left}
          onAnimationEnd={() => handleAnimationEnd(character1.filename, setCharacter1)}
        />
      )}
      {character2 && (
        <Character
          key={2}
          filename={character2.filename}
          top={character2.top}
          left={character2.left}
          onAnimationEnd={() => handleAnimationEnd(character2.filename, setCharacter2)}
        />
      )}
      {character3 && (
        <Character
          key={3}
          filename={character3.filename}
          top={character3.top}
          left={character3.left}
          onAnimationEnd={() => handleAnimationEnd(character3.filename, setCharacter3)}
        />
      )}
      {character4 && (
        <Character
          key={4}
          filename={character4.filename}
          top={character4.top}
          left={character4.left}
          onAnimationEnd={() => handleAnimationEnd(character4.filename, setCharacter4)}
        />
      )}
      {character5 && (
        <Character
          key={5}
          filename={character5.filename}
          top={character5.top}
          left={character5.left}
          onAnimationEnd={() => handleAnimationEnd(character5.filename, setCharacter5)}
        />
      )}
    </div>
  );
};
