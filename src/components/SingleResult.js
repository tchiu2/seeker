import React from 'react';
import {
  majorScale,
  Heading,
  Link,
  Pane,
  Paragraph,
  Text,
} from 'evergreen-ui';

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
        <img src={thumbnail} alt={thumbnail}/>
      </Pane>
      <Pane
        display="flex"
        flexDirection="column"
        padding={majorScale(1)}
      >
        <Heading size={600}>{title}</Heading>
        <Text color="default">{authors}</Text>
        <Text color="default">{publisher} ({publishedDate.slice(0,4)})</Text>
        <Paragraph color="muted">{textSnippet}</Paragraph>
        <Link href={previewLink}>View more details on Google Books</Link>
      </Pane>
    </Pane>
  );
};

export default SingleResult;
