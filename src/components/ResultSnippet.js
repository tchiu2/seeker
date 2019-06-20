import React from 'react';
import { Paragraph } from 'evergreen-ui';

const ResultSnippet = ({ snippet }) => { 
  const text = snippet.replace(/<br>/gi, "");

  return (
    <Paragraph
      color="muted"
      dangerouslySetInnerHTML={{
        __html: text,
      }}
    />
  );
};

export default ResultSnippet;
