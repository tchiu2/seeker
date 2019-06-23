import React, { Component } from 'react';
import {
  majorScale,
  Button,
  Pane,
  Spinner,
} from 'evergreen-ui';
import Search from './Search';
import Results from './Results';
import NoResults from './NoResults';
import { getBooks } from '../util/api_util';

class Main extends Component {
  state = {
    inputQuery: '',
    query: '',
    results: [],
    totalItems: 0,
    isLoading: false,
    hasFetched: false,
  };

  handleChange = e => this.setState({ inputQuery: e.target.value });

  handleKeyDown = e => {
    if (!this.state.inputQuery) return;

    if (e.key === "Enter") {
      if (this.state.inputQuery === this.state.query) return;

      this.setState({
        results: [],
        query: this.state.inputQuery,
      }, this.loadMore);

      window.scrollTo(0, 0);
    }
  };

  updateResults = ({ results, totalItems }) => this.setState({
    results: [...this.state.results, ...results],
    isLoading: false,
    totalItems,
  });

  loadMore = () =>
    this.setState({
      isLoading: true,
      hasFetched: true,
    }, () => getBooks({
      q: this.state.query,
      startIndex: this.state.results.length,
    }).then(this.updateResults));

  render() {
    const {
      results,
      isLoading,
      hasFetched,
      totalItems,
      inputQuery,
      query,
    } = this.state;
    const hasMore = results.length < totalItems;
    const hasResults = !!results.length;

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
          <Results results={results} />
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

export default Main;
