'use client';

import { useRef } from 'react';

import Image from 'next/image';

import styles from '@/styles/general/search.module.scss';

import SearchIcon from '@/../public/icons/search-interface-symbol.png';

type SearchProps = {
  onSearchHandler: (value: string) => void;
  placeholder: string;
  componentStyle: string;
};

/**
 * @memberof ElectionSessions
 * @returns input for search
 */
function SearchItem(props: SearchProps) {
  const inputRef = useRef<any>('');

  const onChangeInputHandler = () => {
    props.onSearchHandler(inputRef.current.value);
  };

  return (
    <div className={styles[props.componentStyle]}>
      <Image src={SearchIcon} alt='Icon' className={styles['search--icon']} />
      <input
        placeholder={props.placeholder}
        className={styles['input--container']}
        onChange={onChangeInputHandler}
        ref={inputRef}
      />
      ;
    </div>
  );
}

export default SearchItem;
