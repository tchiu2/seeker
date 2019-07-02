import React from 'react';
import PropTypes from 'prop-types';
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

Search.propTypes = {
  onChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default Search;
