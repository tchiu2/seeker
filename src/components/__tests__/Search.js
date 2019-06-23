import React from 'react';
import { shallow } from 'enzyme';
import Search from '../Search';

describe('<Search />', () => {
  it('renders without crashing', () => {
    shallow(<Search />);
  });
});
