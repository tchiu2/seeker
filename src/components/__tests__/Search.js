import React from 'react';
import { shallow } from 'enzyme';
import { SearchInput } from 'evergreen-ui';
import Search from '../Search';

describe('<Search />', () => {
  let props;
  beforeEach(() => {
    props = {
      onChange: jest.fn(),
      onKeyDown: jest.fn(),
      value: 'foo',
    };
  });

  it('renders without crashing', () => {
    shallow(<Search {...props} />);
  });

  it('renders a <SearchInput /> to allow users to input text', () => {
    const wrapper = shallow(<Search {...props} />);
    expect(wrapper.find(SearchInput)).toHaveLength(1);
  });

  it('renders placeholder text for the input (not empty)', () => {
    const wrapper = shallow(<Search {...props} />);
    const input = wrapper.find(SearchInput).first();
    expect(input.props().placeholder.length).toBeGreaterThan(0);
  });

  it('receives props and correctly passes them to the input', () => {
    const wrapper = shallow(<Search {...props} foo="bar"/>);
    const input = wrapper.find(SearchInput).first();
    expect(input.props().value).toEqual('foo');
    expect(input.props().foo).toEqual('bar');
  });

  it('sticks to the top of view', () => {
    const wrapper = shallow(<Search {...props} />);
    expect(wrapper.prop('position')).toEqual('sticky');
    expect(wrapper.prop('top')).toEqual(0);
  });
});
