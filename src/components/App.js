import React, { Component } from 'react';
import {
  majorScale,
  Button,
  Pane,
  Spinner,
} from 'evergreen-ui';
import Search from './Search';
import BooksList from './BooksList';
import NoResults from './NoResults';
import { getBooks } from '../util/api_util';

class App extends Component {
  state = {
    inputQuery: '',
    query: '',
    searchResults: [],
    totalResults: 0,
    isLoading: false,
    hasFetched: false,
  };

  handleChange = e => this.setState({ inputQuery: e.target.value });

  handleKeyDown = e => {
    if (!this.state.inputQuery) return;

    if (e.key === 'Enter') {
      if (this.state.inputQuery === this.state.query) return;

      this.setState({
        searchResults: [],
        query: this.state.inputQuery,
      }, this.loadMore);

      window.scrollTo(0, 0);
    }
  };

  handleClick = keyword => e => {
    this.setState({
      searchResults: [],
      query: keyword,
      inputQuery: keyword
    }, this.loadMore);
  };

  updateResults = ({ results, totalItems }) => {
    this.setState({
      searchResults: [...this.state.searchResults, ...results],
      isLoading: false,
      totalResults: totalItems,
    });
  };

  loadMore = () => {
    this.setState({
      isLoading: true,
      hasFetched: true,
    }, () => getBooks({
      q: this.state.query,
      startIndex: this.state.searchResults.length,
    }).then(this.updateResults));
  };

  render() {
    const {
      searchResults,
      isLoading,
      hasFetched,
      totalResults,
      inputQuery,
      query,
    } = this.state;
    const hasMore = searchResults.length < totalResults;
    const hasResults = !!searchResults.length;

    return (
      <Pane>
        <Search
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          value={inputQuery}
        />
        <Pane
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          flex={1}
          padding={majorScale(2)}
        >
          <BooksList books={searchResults} handleClick={this.handleClick} />
          {hasFetched && !isLoading && !hasMore &&
            <NoResults
              hasResults={hasResults}
              query={query}
            />
          }
          {isLoading
            ? <Spinner />
            : hasMore && <Button onClick={this.loadMore}>Load more</Button>
          }
        </Pane>
      </Pane>
    );
  }
};

export default App;
