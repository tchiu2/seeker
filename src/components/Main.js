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
    inputQuery: '',
    query: '',
    results: [],
    hasMore: false,
    isLoading: false,
  };

  handleChange = e => this.setState({ inputQuery: e.target.value });

  handleKeyDown = e => {
    if (!this.state.inputQuery) return;

    if (e.key === "Enter") {
      if (this.state.inputQuery === this.state.query) return;

      this.setState({
        results: [],
        query: this.state.inputQuery
      }, this.loadMore);

      window.scrollTo(0, 0);
    }
  };

  updateResults = results => this.setState({
    results: [...this.state.results, ...results],
    hasMore: results.length > 0,
    isLoading: false,
  });

  loadMore = () =>
    this.setState({ isLoading: true }, () =>
      getBooks({
        q: this.state.query,
        startIndex: this.state.results.length
      }).then(this.updateResults)
    );

  render() {
    const { results, isLoading, hasMore } = this.state;

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
            value={this.props.inputQuery}
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
          <Results results={results} />
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
