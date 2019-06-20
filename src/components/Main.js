import React, { Component } from 'react';
import { majorScale, Pane } from 'evergreen-ui';

import Search from './Search';
import Results from './Results';
import { getBooks } from '../util/api_util';

class Main extends Component {
  state = {
    query: '',
    results: [],
  };

  handleChange = e => this.setState({ query: e.target.value });

  handleKeyDown = e => {
    if (!this.state.query) return;

    if (e.keyCode === 13) {
      this.loadMore();
      window.scrollTo(0, 0);
    }
  };

  loadMore = () => {
    const queryString = this.state.query.split(" ").join("+");
    getBooks(queryString).then(results => this.updateResults(results));
  };

  updateResults = results => this.setState({
    results: [...this.state.results, ...results],
  });

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
            updateResults={this.updateResults}
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
        </Pane>
      </Pane>
    );
  }
};

export default Main;
