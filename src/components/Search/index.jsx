import React, { useContext, useRef, useCallback, useState } from 'react';
import debounce from 'lodash.debounce';

import { SearchContext } from '../../App';

import styles from './Search.module.scss';

export const Search = () => {
  const [value, setValue] = useState('')
  const { setSearchValue } = useContext(SearchContext);
  const ref = useRef();

  const handleClearButton = () => {
    setValue('');
    ref.current.focus();
  };

  const updateSeatchValue = useCallback(
    debounce(value => setSearchValue(value), 1000),
  []);

  const onChangeInput = (evt) => {
    const inputValue = evt.target.value;
    setValue(inputValue)
    updateSeatchValue(inputValue)
  }


  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        height="48"
        viewBox="0 0 48 48"
        width="48"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M31 28h-1.59l-.55-.55c1.96-2.27 3.14-5.22 3.14-8.45 0-7.18-5.82-13-13-13s-13 5.82-13 13 5.82 13 13 13c3.23 0 6.18-1.18 8.45-3.13l.55.55v1.58l10 9.98 2.98-2.98-9.98-10zm-12 0c-4.97 0-9-4.03-9-9s4.03-9 9-9 9 4.03 9 9-4.03 9-9 9z" />
        <path d="M0 0h48v48h-48z" fill="none" />
      </svg>
      <input
        ref={ref}
        className={styles.input}
        placeholder="Поиск пиццы..."
        value={value}
        onChange={onChangeInput}
      ></input>
      {value && (
        <i className={styles.close} onClick={handleClearButton}>
          &#215;
        </i>
      )}
    </div>
  );
};

export default Search;
