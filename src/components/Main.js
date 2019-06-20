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
          <Search updateResults={this.updateResults}/>
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
