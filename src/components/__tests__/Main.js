import React from 'react';
import { shallow } from 'enzyme';
import Main from '../Main';
import Search from '../Search';

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
    global.scrollTo = jest.fn();
    const instance = shallow(<Main />).instance();
    instance.loadMore = jest.fn();

    const nonEnterKeyEvent = { key: "a" };
    const enterKeyEvent = { key: "Enter" };

    instance.setState({ results: [], inputQuery: "foo", query: "" })

    expect(instance.state.query).toEqual("");

    instance.handleKeyDown(nonEnterKeyEvent);
    expect(instance.state.query).toEqual("");
    expect(instance.loadMore).not.toBeCalled();
    expect(global.scrollTo).not.toBeCalled();

    instance.handleKeyDown(enterKeyEvent);
    expect(instance.state.query).toEqual("foo");
    expect(instance.loadMore).toBeCalled();
    expect(global.scrollTo).toBeCalled();

    instance.handleKeyDown(enterKeyEvent);
    expect(instance.loadMore.mock.calls.length).toEqual(1);
    expect(global.scrollTo.mock.calls.length).toEqual(1);
  });

  it('has a handleClick function that closes over a keyword', () => {
    const instance = shallow(<Main />).instance();

    expect(typeof instance.handleClick("foo")).toEqual("function");
  });

  it('updates state correctly for onClick events', () => {
    const instance = shallow(<Main />).instance();
    instance.loadMore = jest.fn();

    expect(instance.state.inputQuery).toEqual("");

    instance.handleClick("foo")();
    expect(instance.state.inputQuery).toEqual("foo");
    expect(instance.loadMore).toBeCalled();

    instance.handleClick("bar")();
    expect(instance.state.inputQuery).toEqual("bar");
    expect(instance.loadMore.mock.calls.length).toEqual(2);
  });

  it('has a loadMore function that updates isLoading and hasFetched state', () => {
    const instance = shallow(<Main />).instance();
    const getBooks = jest.fn();
    instance.updateResults = jest.fn();

    expect(instance.state.isLoading).toEqual(false);
    expect(instance.state.hasFetched).toEqual(false);

    instance.loadMore();
    expect(instance.state.isLoading).toEqual(true);
    expect(instance.state.hasFetched).toEqual(true);
  });

  it('calls getBooks with the query string and updates state with the results correctly', () => {
    const instance = shallow(<Main />).instance();
    const getBooks = jest.fn(params => Promise.resolve({ results: ["foo"], totalItems: 1 }));

    instance.setState({ query: "foo" });

    expect(instance.state.results).toHaveLength(0);
    expect(instance.state.totalItems).toEqual(0);

    instance.loadMore();

    return getBooks({
      q: instance.state.query,
      startIndex: instance.state.results.length
    }).then(instance.updateResults)
      .then(() => {
        expect(instance.state.results).toHaveLength(1);
        expect(instance.state.totalItems).toEqual(1);
      });
  });

  it('renders a <Search /> component and passes the necessary props', () => {
    const wrapper = shallow(<Main />);
    const instance = wrapper.instance();
    const search = wrapper.find(Search);

    expect(search).toHaveLength(1);
    expect(search.prop("onChange")).toBe(instance.handleChange);
    expect(search.prop("onKeyDown")).toBe(instance.handleKeyDown);
    expect(search.prop("value")).toBe(instance.state.inputQuery);
  });
});
