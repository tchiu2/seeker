import React from 'react';
import '../styles/App.css';
import { Pane } from 'evergreen-ui';

import Main from './Main';

const App = () => (
  <Pane 
    display="flex"
    justifyContent="center"
    flex={1}
    padding={16}
  >
    <Main />
  </Pane>
);

export default App;
