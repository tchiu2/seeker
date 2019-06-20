import React, { Component } from 'react';
import { Pane } from 'evergreen-ui';

import Search from './Search';
import Results from './Results';

class Main extends Component {
  state = {
    results: [],
  };

  updateResults = results => this.setState({ results });

  render() {
    return (
      <Pane>
        <Search updateResults={this.updateResults}/>
        <Results results={this.state.results} />
      </Pane>
    );
  }
};

export default Main;
