import React from 'react';
import { shallow } from 'enzyme';
import { SearchInput } from 'evergreen-ui';
import Search from '../Search';

describe('<Search />', () => {
  it('renders without crashing', () => {
    shallow(<Search />);
  });

  it('renders a <SearchInput /> to allow users to input text', () => {
    const wrapper = shallow(<Search />);
    expect(wrapper.find(SearchInput)).toHaveLength(1);
  });

  it('renders placeholder text for the input (not empty)', () => {
    const wrapper = shallow(<Search />);
    const input = wrapper.find(SearchInput).first();
    expect(input.props().placeholder.length).toBeGreaterThan(0);
  });

  it('receives props and correctly passes them to the input', () => {
    const wrapper = shallow(<Search foo="bar"/>);
    const input = wrapper.find(SearchInput).first();
    expect(input.props().foo).toEqual('bar');
  });

  it('sticks to the top of view', () => {
    const wrapper = shallow(<Search />);
    expect(wrapper.prop('position')).toEqual('sticky');
    expect(wrapper.prop('top')).toEqual(0);
  });
});
