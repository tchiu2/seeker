import React from 'react';
import { shallow } from 'enzyme';
import { Button, Spinner } from 'evergreen-ui';
import App from '../App';
import Search from '../Search';
import Results from '../Results';
import NoResults from '../NoResults';
import * as ApiUtil from '../../util/api_util';

describe('<App />', () => {
  it('renders without crashing', () => {
    shallow(<App />);
  });

  it('updates state correctly when user types in input field', () => {
    const instance = shallow(<App />).instance();
    const event = { target: { value: 'foo' } };

    expect(instance.state.inputQuery).toEqual('');
    instance.handleChange(event);
    expect(instance.state.inputQuery).toEqual('foo');
  });

  it('only triggers fetching more data when the "Enter" key is pressed and the query is different from the previous', () => {
    global.scrollTo = jest.fn();
    const instance = shallow(<App />).instance();
    instance.loadMore = jest.fn();

    const nonEnterKeyEvent = { key: 'a' };
    const enterKeyEvent = { key: 'Enter' };

    instance.setState({ results: [], inputQuery: 'foo', query: '' })

    expect(instance.state.query).toEqual('');

    instance.handleKeyDown(nonEnterKeyEvent);
    expect(instance.state.query).toEqual('');
    expect(instance.loadMore).not.toBeCalled();
    expect(global.scrollTo).not.toBeCalled();

    instance.handleKeyDown(enterKeyEvent);
    expect(instance.state.query).toEqual('foo');
    expect(instance.loadMore).toBeCalled();
    expect(global.scrollTo).toBeCalled();

    instance.handleKeyDown(enterKeyEvent);
    expect(instance.loadMore.mock.calls.length).toEqual(1);
    expect(global.scrollTo.mock.calls.length).toEqual(1);
  });

  it('has reusuable click handler for links', () => {
    const instance = shallow(<App />).instance();

    expect(typeof instance.handleClick('foo')).toEqual('function');
  });

  it('updates state correctly when user clicks on various elements', () => {
    const instance = shallow(<App />).instance();
    instance.loadMore = jest.fn();

    expect(instance.state.inputQuery).toEqual('');

    instance.handleClick('foo')();
    expect(instance.state.inputQuery).toEqual('foo');
    expect(instance.loadMore).toBeCalled();

    instance.handleClick('bar')();
    expect(instance.state.inputQuery).toEqual('bar');
    expect(instance.loadMore.mock.calls.length).toEqual(2);
  });

  it('keeps track of loading and fetched state that is toggled by searching for results', () => {
    const instance = shallow(<App />).instance();
    jest.spyOn(ApiUtil, 'getBooks');
    jest.spyOn(instance, 'updateResults');

    expect(instance.state.isLoading).toEqual(false);
    expect(instance.state.hasFetched).toEqual(false);

    instance.loadMore();
    expect(instance.state.isLoading).toEqual(true);
    expect(instance.state.hasFetched).toEqual(true);
  });

  it('requests search results based on query and updates state with the results correctly', () => {
    jest.spyOn(ApiUtil, 'getBooks').mockResolvedValue({ results: ['foo'], totalItems: 1 });

    const instance = shallow(<App />).instance();

    instance.setState({ query: 'foo' });

    expect(instance.state.results).toHaveLength(0);
    expect(instance.state.totalItems).toEqual(0);

    instance.loadMore();

    return Promise.resolve().then(() => {
      expect(ApiUtil.getBooks).toHaveBeenCalledWith({ q: 'foo', startIndex: 0 });
      expect(instance.state.results).toHaveLength(1);
      expect(instance.state.totalItems).toEqual(1);
    });
  });

  it('renders a <Search /> component and passes the necessary props', () => {
    const wrapper = shallow(<App />);
    const instance = wrapper.instance();
    const search = wrapper.find(Search);

    expect(search).toHaveLength(1);
    expect(search.prop('onChange')).toBe(instance.handleChange);
    expect(search.prop('onKeyDown')).toBe(instance.handleKeyDown);
    expect(search.prop('value')).toBe(instance.state.inputQuery);
  });

  it('renders a <Results /> component and passes the necessary props', () => {
    const wrapper = shallow(<App />);
    const instance = wrapper.instance();
    const results = wrapper.find(Results);

    expect(results).toHaveLength(1);
    expect(results.prop('handleClick')).toBe(instance.handleClick);
    expect(results.prop('results')).toBe(instance.state.results);
  });

  it('renders a <NoResults /> component when there are no (more) results', () => {
    const wrapper = shallow(<App />);

    expect(wrapper.find(NoResults)).toHaveLength(0);
    // don't show it before fetching the first time
    wrapper.setState({ hasFetched: true });
    expect(wrapper.find(NoResults)).toHaveLength(1);

    // render when results.length === totalItems
    wrapper.setState({ results: ['foo'], totalItems: 2 });
    expect(wrapper.find(NoResults)).toHaveLength(0);
    wrapper.setState({ results: ['foo', 'bar'] });
    expect(wrapper.find(NoResults)).toHaveLength(1);
  });

  it('renders a <Spinner /> component when the app is in loading state', () => {
    const wrapper = shallow(<App />);

    expect(wrapper.find(Spinner)).toHaveLength(0);
    wrapper.setState({ isLoading: true });
    expect(wrapper.find(Spinner)).toHaveLength(1);
  });

  it('renders a "Load more" button when there are more results', () => {
    const wrapper = shallow(<App />);

    // don't render before fetching the first time
    expect(wrapper.find(Button)).toHaveLength(0);
    wrapper.setState({ hasFetched: true, results: ['foo'], totalItems: 2 });
    expect(wrapper.find(Button)).toHaveLength(1);

    // don't render when results.length === totalItems
    wrapper.setState({ results: ['foo', 'bar'] });
    expect(wrapper.find(Button)).toHaveLength(0);
  });
});
