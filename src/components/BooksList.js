import React, { memo } from 'react';
import { Pane } from 'evergreen-ui';
import Book from './Book';

const BooksList = ({ books, handleClick }) => (
  <Pane
    display="flex"
    flexDirection="column"
    alignItems="center"
  >
    {books.map((book, idx) =>
      <Book key={idx} {...book} handleClick={handleClick} />
    )}
  </Pane>
);

BooksList.defaultProps = {
  books: [],
};

export default memo(BooksList);
