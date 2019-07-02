import React, { memo } from 'react';
import PropTypes from 'prop-types';
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

BooksList.propTypes = {
  books: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default memo(BooksList);
