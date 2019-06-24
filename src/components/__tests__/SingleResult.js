import React from 'react';
import { render, shallow } from 'enzyme';
import { Heading, Link } from 'evergreen-ui';
import ThumbnailPlaceholder from '../ThumbnailPlaceholder';
import SingleResult from '../SingleResult';
import ResultSnippet from '../ResultSnippet';

describe('<SingleResult />', () => {
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

  it('renders with default authors prop', () => {
    shallow(<SingleResult />);
  });

  it('renders a <ThumbnailPlaceholder /> if a thumbnail is not provided', () => {
    const wrapper = shallow(<SingleResult {...props} />)

    expect(wrapper.find(ThumbnailPlaceholder)).toHaveLength(1);
  });

  it('renders an <img /> if a thumbnail is provided', () => {
    props.thumbnail = 'https://via.placeholder.com/150';

    const wrapper = shallow(<SingleResult {...props} />)

    expect(wrapper.find('img')).toHaveLength(1);
  });

  it('renders clickable author Link', () => {
    const callback = jest.fn();
    props.handleClick.mockReturnValue(callback);

    const author = props.authors[0];
    const wrapper = shallow(<SingleResult {...props} />)
    const authorLink = wrapper.findWhere(n => n.props().children === author);

    authorLink.simulate('click');

    expect(props.handleClick).toHaveBeenCalledWith(`inauthor:"${author}"`);
    expect(callback).toHaveBeenCalled();
  });

  it('renders title correctly', () => {
    const wrapper = shallow(<SingleResult {...props} />);
    const titles = wrapper.find(Heading).props().children;

    expect(titles.join('')).toEqual('hello: world');
  });

  it('renders <ResultSnippet /> with textSnippet', () => {
    const wrapper = shallow(<SingleResult {...props} />);
    const resultSnippet = wrapper.find(ResultSnippet);

    expect(resultSnippet.prop('snippet')).toEqual(props.textSnippet);
  });

  it('renders a preview link with previewLink', () => {
    const wrapper = shallow(<SingleResult {...props} />);
    const previewLink = wrapper.findWhere(n => n.props().children === 'Preview');

    expect(previewLink.prop('href')).toEqual(props.previewLink);
  });
});
