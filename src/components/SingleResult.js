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

const SingleResult = ({
  authors,
  title,
  subtitle,
  publisher,
  publishedDate,
  thumbnail,
  textSnippet,
  previewLink,
  handleClick,
}) => (
  <Pane
    display="flex"
    padding={majorScale(1)}
    margin={majorScale(1)}
    width="100%"
    maxWidth={940}
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
      <Heading size={600}>{title}{subtitle && `: ${subtitle}`}</Heading>
      <Pane display="flex">
        {authors.map((author, i) => ([
          i > 0 && <Text>,&nbsp;</Text>,
          <Link href="#" onClick={handleClick(`inauthor:"${author}"`)}>{author}</Link>
        ]))}
      </Pane>
      <Text color="default">{publisher}{publishedDate && ` (${publishedDate.slice(0,4)})`}</Text>
      <ResultSnippet snippet={textSnippet} />
      <Pane flex={0}>
        <Link target="_blank" href={previewLink}>Preview</Link>
      </Pane>
    </Pane>
  </Pane>
);

SingleResult.defaultProps = {
  authors: []
};

export default SingleResult;
