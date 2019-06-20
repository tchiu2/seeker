import React from 'react';
import '../styles/App.css';
import { Pane } from 'evergreen-ui';

import Search from './Search';

const App = () => (
  <Pane 
    display="flex"
    justifyContent="center"
    flex={1}
    padding={16}
  >
    <Search />
  </Pane>
);

export default App;
