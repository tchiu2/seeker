import React, { Component } from 'react';
import { SearchInput } from 'evergreen-ui';

import { getBooks } from '../util/api_util';

class Search extends Component {
  state = {
    query: '',
  };

  getResults = () => {
    const queryString = this.state.query.split(" ").join("+");

    getBooks(queryString)
      .then(results => this.props.updateResults(results));
  };

  handleChange = e => this.setState({ query: e.target.value });

  handleKeyDown = e => {
    if (e.keyCode === 13) {
      this.getResults();
    }
  };

  render() {
    return (
      <SearchInput
        placeholder="Search books..." 
        value={this.state.query}
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
      />
    );
  }
}

export default Search;
