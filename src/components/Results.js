import React from 'react';
import { Pane } from 'evergreen-ui';
import SingleResult from './SingleResult';

const Results = ({ results }) => (
  <Pane
    display="flex"
    flexDirection="column"
    alignItems="center"
  >
    {results.map((result, idx) =>
      <SingleResult key={idx} result={result} />
    )}
  </Pane>
);

export default Results;
