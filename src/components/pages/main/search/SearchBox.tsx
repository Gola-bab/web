import React from 'react';
import { useCallback, useMemo } from 'react';
import { useQuery } from '@/hooks';
import { Visible, Input } from '@/layouts';
import { SearchIcon, MapIcon } from '@/icons';
import { IconButton } from '@mui/material';
import styles from '@/styles/Search.module.css';

type Props = {
  value: string;

  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchBox = ({ value, handleChange }: Props) => {
  const { isDefault, isCustom, setQuery } = useQuery();
  const handleIconClicked = useCallback(() => {
    setQuery('mode', isCustom ? 'search' : 'custom');
  }, [isCustom]);

  const SearchBoxIcon = useMemo(() => {
    return isCustom ? <SearchIcon /> : <MapIcon />;
  }, [isCustom]);

  return (
    <Visible visible={!isDefault} className={styles.search_box}>
      <IconButton onClick={handleIconClicked}>{SearchBoxIcon}</IconButton>
      <Input
        value={value}
        placeholder='장소 주소 식당 검색'
        border={false}
        onChange={handleChange}
        onClick={() => {
          setQuery('mode', 'search');
        }}
        textAlign='left'
        className={styles.search_box__input}
      />
    </Visible>
  );
};

export default SearchBox;
