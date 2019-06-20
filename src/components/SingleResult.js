import React from 'react';
import {
  Pane,
  Heading,
} from 'evergreen-ui';

const SingleResult = ({ result }) => {
  const {
    authors,
    title,
    subtitle,
    publisher,
    publishedDate,
    thumbnail,
    textSnippet,
    infoLink,
  } = result;

  return (
    <Pane>
      <Heading>{title}</Heading>
    </Pane>
  );
};

export default SingleResult;
