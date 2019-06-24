import React from 'react';
import { shallow } from 'enzyme';
import { Alert } from 'evergreen-ui';
import NoResults from '../NoResults';

describe('<NoResults />', () => {
  it('renders without crashing', () => {
    shallow(<NoResults />);
  });

  it('renders a <Alert /> to display the no (more) results message', () => {
    const wrapper = shallow(<NoResults />);
    expect(wrapper.find(Alert)).toHaveLength(1);
  });

  it('renders title correctly based on hasResults and query props', () => {
    const queryString = 'foo';
    const wrapper = shallow(<NoResults query={queryString} hasResults={false} />);
    expect(wrapper.props().title).toContain(queryString);
    expect(wrapper.props().title).not.toContain('more');
  });
});
