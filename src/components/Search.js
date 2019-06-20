import React from 'react';
import { SearchInput } from 'evergreen-ui';

const Search = props =>
  <SearchInput
    placeholder="Search books..."
    {...props}
  />

export default Search;
