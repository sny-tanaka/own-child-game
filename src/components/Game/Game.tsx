import { useEffect, useState } from 'react';
import { Character } from '../Character/Character';
import styles from './style.module.scss';

type Props = {};

type CharacterType = {
  filename: string;
  top: number;
  left: number;
};

const TOP_THRESHOLD = 75;
const LEFT_THRESHOLD = 60;
const MAX_CHARACTERS = 5;

const CHARACTER_LIST = [
  'anpanman',
  'shokupanman',
  'currypanman',
  'baikinman',
  'dokinchan',
  'kokinchan',
];

export const Game = ({}: Props) => {
  const [characters, setCharacters] = useState<CharacterType[]>([]);
  const [availableCharacters, setAvailableCharacters] = useState(CHARACTER_LIST);

  const onClickCharacter = (index: number, filename: string) => {
    setCharacters((prev) => prev.filter((_, i) => i !== index));
    setAvailableCharacters((prev) => [...prev, filename]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (characters.length >= MAX_CHARACTERS) {
        return;
      }
      const top = Math.random() * TOP_THRESHOLD;
      const left = Math.random() * LEFT_THRESHOLD;
      const filename = availableCharacters[Math.floor(Math.random() * availableCharacters.length)];
      setAvailableCharacters((prev) => prev.filter((name) => name !== filename));
      setCharacters((prev) => [...prev, { filename, top, left }]);
    }, 2000);

    return () => clearInterval(interval);
  }, [characters, availableCharacters]);

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
    <div className={styles.container}>
      {characters.map((char, index) => (
        <Character
          key={index}
          filename={char.filename}
          top={char.top}
          left={char.left}
          onClick={() => onClickCharacter(index, char.filename)}
        />
      ))}
    </div>
  );
};
