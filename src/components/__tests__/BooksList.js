import React from 'react';
import { shallow } from 'enzyme';
import BooksList from '../BooksList';
import Book from '../Book';

describe('<BooksList />', () => {
  let props;

  beforeEach(() => {
    props = {
      books: [
        { title: 'foo', authors: ['abc'] },
        { title: 'bar', authors: ['def'] },
        { title: 'baz', authors: ['xyz'] },
      ]
    };
  });

  it('renders correctly without results prop', () => {
    shallow(<BooksList />);
  });

  it('renders the correct number of <Book /> components', () => {
    const wrapper = shallow(<BooksList {...props} />);
    const books = wrapper.find(Book);

    expect(books).toHaveLength(props.books.length);
  });

  it('passes down props to <Book /> correctly', () => {
    const wrapper = shallow(<BooksList {...props} />);
    const books = wrapper.find(Book);

    books.forEach((book, i) => {
      expect(book.prop('title')).toEqual(props.books[i].title);
      expect(book.prop('authors')).toEqual(props.books[i].authors);
    });
  });
});
