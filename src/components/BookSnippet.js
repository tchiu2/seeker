import React from 'react';
import { Paragraph } from 'evergreen-ui';

const BookSnippet = ({ snippet }) => {
  const text = snippet.replace(/<br>/gi, '');

  return (
    <Paragraph
      color="muted"
      dangerouslySetInnerHTML={{
        __html: text,
      }}
    />
  );
};

BookSnippet.defaultProps = {
  snippet: '',
};

export default BookSnippet;
