import React from 'react';
import { UnorderedList } from 'evergreen-ui';
import SingleResult from './SingleResult';

const Results = ({ results }) => (
  <UnorderedList>
    {results.map((result, idx) =>
      <SingleResult key={idx} result={result} />
    )}
  </UnorderedList>
);

export default Results;
