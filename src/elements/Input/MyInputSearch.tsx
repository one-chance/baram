import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

import { useRecoilState } from 'recoil';
import { SearchValueState } from 'state/index';

/*
* copy code for Get SearchValue on the other component
import { useRecoilValue } from 'recoil';
import { SearchValueState } from 'state';

const searchValue = useRecoilValue(SearchValueState);
*/
const MyInputSearch = () => {

  const [searchValue, setSearchValue] = useRecoilState(SearchValueState);
  
  const _onChangeSearch = (value: string) => {
    setSearchValue(value);
    console.log("SEARCH KEYWORD : ", value);
  }
  
  return (
    <TextField
      fullWidth
      size="small"
      id="raidsearch"
      name="raidsearch"
      label="검색"
      value={searchValue}
      onChange={(e) => _onChangeSearch(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
}

export default MyInputSearch;