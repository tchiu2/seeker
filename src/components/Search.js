import React, { Component } from 'react';
import { SearchInput } from 'evergreen-ui';

import { getBooks } from '../util/api_util';

class Search extends Component {
  state = {
    query: ''
  };

  getResults = () => {
    const queryString = this.state.query.split(" ").join("+");

    getBooks(queryString)
      .then(d => console.log(d));
  };

  handleChange = e => this.setState({ query: e.target.value });

  handleKeyDown = e => {
  };

  render() {
    return (
      <>
      <SearchInput
        placeholder="Search books..." 
        value={this.state.query}
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
      />
      {encodeURIComponent(this.state.query)}
      </>
    );
  }
}

export default Search;
