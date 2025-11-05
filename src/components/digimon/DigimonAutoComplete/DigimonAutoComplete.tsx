import { useCallback } from 'react';

import { Autocomplete, createFilterOptions, TextField } from '@mui/material';

import styles from './style.module.scss';

import { DIGIMON_LIST } from '@/constants';
import { Digimon } from '@/types/digimon';

const filterOptions = createFilterOptions({
  stringify: (option: Digimon) => {
    // オプションの文字列表現(カタカナ名)
    const katakanaName = option.name;
    // ひらがなでも検索できるように、カタカナをひらがなに変換したものも含める
    const hiraganaName = katakanaName.replace(/[\u30a1-\u30f6]/g, (match) => {
      const chr = match.charCodeAt(0) - 0x60;
      return String.fromCharCode(chr);
    });
    // 番号、カタカナ名、ひらがな名を結合して検索対象にする
    return `No.${option.id} ${katakanaName} ${hiraganaName}`;
  },
});

type Props = {
  label: string;
  defaultValue: number | number[];
  onChange: (digimonId: number[]) => void;
  multiple?: boolean;
};

export const DigimonAutoComplete = ({ label, defaultValue, onChange, multiple = false }: Props) => {
  const getDefaultValue = useCallback(() => {
    if (Array.isArray(defaultValue)) {
      return DIGIMON_LIST.filter((digimon) => defaultValue.includes(digimon.id));
    }
    return DIGIMON_LIST.find((digimon) => digimon.id === defaultValue) || null;
  }, [defaultValue]);

  return (
    <Autocomplete
      disablePortal
      options={DIGIMON_LIST}
      filterOptions={filterOptions}
      multiple={multiple}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
        />
      )}
      onChange={(_, value) => {
        if (value) {
          const isArray = Array.isArray(value);
          if (isArray) {
            onChange(value.map((digimon) => digimon.id));
          } else {
            onChange([value.id]);
          }
        } else {
          onChange([]);
        }
      }}
      defaultValue={getDefaultValue()}
      getOptionLabel={(option) => `No.${option.id} ${option.name}`}
      className={styles.container}
    />
  );
};
