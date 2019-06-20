import React from 'react';
import {
  majorScale,
  Heading,
  Link,
  Pane,
  Text,
} from 'evergreen-ui';
import ResultSnippet from './ResultSnippet';
import ThumbnailPlaceholder from './ThumbnailPlaceholder';

const SingleResult = ({ result }) => {
  const {
    authors,
    title,
    publisher,
    publishedDate,
    thumbnail,
    textSnippet,
    previewLink,
  } = result;

  return (
    <Pane
      display="flex"
      padding={majorScale(1)}
      margin={majorScale(1)}
      width="60%"
    >
      <Pane padding={majorScale(1)}>
        {thumbnail ? (
          <img src={thumbnail} alt={thumbnail}/>
        ) : (
          <ThumbnailPlaceholder />
        )}
      </Pane>
      <Pane
        display="flex"
        flexDirection="column"
        padding={majorScale(1)}
      >
        <Heading size={600}>{title}</Heading>
        <Text color="default">{authors}</Text>
        <Text color="default">{publisher} ({publishedDate.slice(0,4)})</Text>
        <ResultSnippet snippet={textSnippet} />
        <Link href={previewLink}>Preview</Link>
      </Pane>
    </Pane>
  );
};

export default SingleResult;
