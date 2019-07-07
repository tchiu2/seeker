import React from 'react';
import PropTypes from 'prop-types';
import {
  majorScale,
  Heading,
  Link,
  Pane,
  Text,
} from 'evergreen-ui';
import BookSnippet from './BookSnippet';
import ThumbnailPlaceholder from './ThumbnailPlaceholder';

const Book = ({
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
    minHeight={180}
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
      <Pane display="flex" flexWrap="wrap">
        {authors.map((author, i) => ([
          i > 0 && <Text key={'spacer' + i}>,&nbsp;</Text>,
          <Link key={i} href="#" onClick={handleClick(`inauthor:"${author}"`)}>{author}</Link>
        ]))}
      </Pane>
      <Text color="default">{publisher}{publishedDate && ` (${publishedDate.slice(0,4)})`}</Text>
      <BookSnippet snippet={textSnippet} />
      <Pane flex={0}>
        <Link target="_blank" href={previewLink}>Preview</Link>
      </Pane>
    </Pane>
  </Pane>
);

Book.defaultProps = {
  authors: []
};

Book.propTypes = {
  authors: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  publisher: PropTypes.string,
  publishedDate: PropTypes.string,
  thumbnail: PropTypes.string,
  textSnippet: PropTypes.string,
  previewLink: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
};

export default Book;
