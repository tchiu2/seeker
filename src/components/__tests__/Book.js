import React from 'react';
import { render, shallow } from 'enzyme';
import { Heading, Link } from 'evergreen-ui';
import Book from '../Book';
import BookSnippet from '../BookSnippet';
import ThumbnailPlaceholder from '../ThumbnailPlaceholder';

describe('<Book />', () => {
  let props;

  beforeEach(() => {
    props = {
      authors: ['John Doe'],
      title: 'hello',
      subtitle: 'world',
      publisher: 'Random House',
      publishedDate: '2010',
      thumbnail: null,
      textSnippet: 'Here\'s the book',
      previewLink: 'https://google.com',
      handleClick: jest.fn(),
    };
  });

  it('renders a <ThumbnailPlaceholder /> if a thumbnail is not provided', () => {
    const wrapper = shallow(<Book {...props} />)

    expect(wrapper.find(ThumbnailPlaceholder)).toHaveLength(1);
  });

  it('renders an <img /> if a thumbnail is provided', () => {
    props.thumbnail = 'https://via.placeholder.com/150';

    const wrapper = shallow(<Book {...props} />)

    expect(wrapper.find('img')).toHaveLength(1);
  });

  it('renders clickable author Link', () => {
    const callback = jest.fn();
    props.handleClick.mockReturnValue(callback);

    const author = props.authors[0];
    const wrapper = shallow(<Book {...props} />)
    const authorLink = wrapper.findWhere(n => n.props().children === author);

    authorLink.simulate('click');

    expect(props.handleClick).toHaveBeenCalledWith(`inauthor:"${author}"`);
    expect(callback).toHaveBeenCalled();
  });

  it('renders title correctly', () => {
    const wrapper = shallow(<Book {...props} />);
    const titles = wrapper.find(Heading).props().children;

    expect(titles.join('')).toEqual('hello: world');
  });

  it('renders <BookSnippet /> with textSnippet', () => {
    const wrapper = shallow(<Book {...props} />);
    const bookSnippet = wrapper.find(BookSnippet);

    expect(bookSnippet.prop('snippet')).toEqual(props.textSnippet);
  });

  it('renders a preview link with previewLink', () => {
    const wrapper = shallow(<Book {...props} />);
    const previewLink = wrapper.findWhere(n => n.props().children === 'Preview');

    expect(previewLink.prop('href')).toEqual(props.previewLink);
  });
});
