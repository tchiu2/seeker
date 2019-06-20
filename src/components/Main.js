import React, { Component } from 'react';
import { majorScale, Pane } from 'evergreen-ui';

import Search from './Search';
import Results from './Results';

class Main extends Component {
  state = {
    results: [],
  };

  updateResults = results => this.setState({ results });

  render() {
    return (
      <Pane
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        flex={1}
        padding={majorScale(2)}
      >
        <Search updateResults={this.updateResults}/>
        <Results results={this.state.results} />
      </Pane>
    );
  }
};

export default Main;
