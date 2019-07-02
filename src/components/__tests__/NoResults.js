import React from 'react';
import { shallow } from 'enzyme';
import { Alert } from 'evergreen-ui';
import NoResults from '../NoResults';

describe('<NoResults />', () => {
  let props;
  beforeEach(() => {
    props = {
      hasResults: true,
      query: 'foo',
    };
  });

  it('renders without crashing', () => {
    shallow(<NoResults {...props} />);
  });

  it('renders a <Alert /> to display the no (more) results message', () => {
    const wrapper = shallow(<NoResults {...props} />);
    expect(wrapper.find(Alert)).toHaveLength(1);
  });

  it('renders title correctly based on hasResults and query props', () => {
    props.hasResults = false;
    const wrapper = shallow(<NoResults {...props} />);
    expect(wrapper.props().title).toContain('foo');
    expect(wrapper.props().title).not.toContain('more');
  });
});
