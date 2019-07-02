import React from 'react';
import { render, shallow } from 'enzyme';
import BookSnippet from '../BookSnippet';

describe('<BookSnippet />', () => {
  it('renders without crashing', () => {
    shallow(<BookSnippet />);
  });

  it('removes extraneous <br> tags from the input string', () => {
    const snippet = 'Hello<br> world<br>';
    const stripped = 'Hello world';
    const wrapper = shallow(<BookSnippet snippet={snippet} />);
    expect(wrapper.html()).toContain(stripped);
  });

  it('renders any valid HTML that is passed as part of the snippet prop correctly', () => {
    const snippet = '<em>Hello</em> <b>world</b>';
    const innerElement = <b>world</b>;
    const wrapper = render(<BookSnippet snippet={snippet} />);
    expect(wrapper.find('b')).toHaveLength(1);
    expect(wrapper.find('em')).toHaveLength(1);
    expect(wrapper.find('div')).toHaveLength(0);
  });
});
