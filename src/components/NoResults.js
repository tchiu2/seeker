import React from 'react';
import { majorScale, Alert } from 'evergreen-ui';

const NoResults = ({ hasResults, query }) => (
  <Alert
    intent="none"
    title={`No${hasResults ? ' more' : ''} results for "${query}".`}
    marginBottom={majorScale(2)}
  >
    Didn't find what you were looking for? Make sure all words are spelled correctly, try different keywords or try more general keywords.
  </Alert>
);

export default NoResults;
