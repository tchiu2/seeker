import React from 'react';
import { Pane } from 'evergreen-ui';
import SingleResult from './SingleResult';

const Results = ({ results, handleClick }) => (
  <Pane
    display="flex"
    flexDirection="column"
    alignItems="center"
  >
    {results.map((result, idx) =>
      <SingleResult key={idx} {...result} handleClick={handleClick} />
    )}
  </Pane>
);

Results.defaultProps = {
  results: [],
};

export default Results;
