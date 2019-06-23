import React from 'react';
import {
	majorScale,
  Pane,
  SearchInput
} from 'evergreen-ui';

const Search = props =>
  <Pane
    display="flex"
    justifyContent="center"
    padding={majorScale(2)}
    elevation={1}
    backgroundColor="white"
    position="sticky"
    top={0}
  >
    <SearchInput
      placeholder="Search books..."
      {...props}
    />
  </Pane>

export default Search;
