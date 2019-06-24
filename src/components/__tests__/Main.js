import React from 'react';
import { shallow } from 'enzyme';
import Main from '../Main';

describe('<Main />', () => {
  it('renders without crashing', () => {
    shallow(<Main />);
  });

  it('updates inputQuery state correctly for onChange event', () => {
    const instance = shallow(<Main />).instance();
    const event = { target: { value: 'foo' } };

    expect(instance.state.inputQuery).toEqual('');
    instance.handleChange(event);
    expect(instance.state.inputQuery).toEqual('foo');
  });

  it('updates state correctly for onKeyDown events', () => {
    const instance = shallow(<Main />).instance();
    const nonEnterKeyEvent = { key: "a" };
    const enterKeyEvent = { key: "Enter" };

    instance.setState({ results: [], inputQuery: "", query: "" })

    expect(instance.state.query).toEqual("");
    instance.handleKeyDown(nonEnterKeyEvent);
    expect(instance.state.query).toEqual("");
  });
});
