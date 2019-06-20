import React, { Component } from 'react';
import {
  majorScale,
  Button,
  Pane,
  Spinner,
} from 'evergreen-ui';

import Search from './Search';
import Results from './Results';
import { getBooks } from '../util/api_util';

class Main extends Component {
  state = {
    query: '',
    prevQuery: '',
    results: [],
    page: 1,
    hasMore: true,
    isLoading: false,
  };

  handleChange = e => this.setState({ query: e.target.value });

  handleKeyDown = e => {
    if (!this.state.query) return;

    if (e.keyCode === 13) {
      if (this.state.query !== this.state.prevQuery) {
        this.setState({ results: [], page: 1 });
      }

      this.setState({ prevQuery: this.state.query }, this.loadMore);
      window.scrollTo(0, 0);
    }
  };

  updateResults = results => this.setState({
    results: [...this.state.results, ...results],
    hasMore: results.length > 0,
  }, this.setState({ isLoading: false }));

  handleClick = e => this.setState({ page: this.state.page + 1 }, this.loadMore);

  loadMore = () => {
    const queryString = this.state.prevQuery.split(" ").join("+");
    this.setState({ isLoading: true }, () =>
      getBooks(queryString, this.state.page).then(this.updateResults));
  };

  render() {
    return (
      <Pane>
        <Pane
          display="flex"
          justifyContent="center"
          padding={majorScale(2)}
          elevation={1}
          backgroundColor="white"
          position="sticky"
          top={0}
        >
          <Search
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            value={this.props.query}
          />
        </Pane>
        <Pane
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          flex={1}
          padding={majorScale(2)}
        >
          <Results results={this.state.results} />
          {!this.state.isLoading ? (
            (this.state.results.length > 0 && this.state.hasMore) &&
              <Button onClick={this.handleClick}>Load more</Button>
          ) : (
            <Spinner />
          )}
        </Pane>
      </Pane>
    );
  }
};

export default Main;
