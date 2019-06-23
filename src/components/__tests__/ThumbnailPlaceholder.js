import React from 'react';
import { shallow } from 'enzyme';
import ThumbnailPlaceholder from '../ThumbnailPlaceholder';

describe('<ThumbnailPlaceholder />', () => {
  it('renders without crashing', () => {
    shallow(<ThumbnailPlaceholder />);
  });

  it('renders "No thumbnail" text', () => {
    const wrapper = shallow(<ThumbnailPlaceholder />);
    expect(wrapper.contains('No thumbnail')).toEqual(true);
  });
});
