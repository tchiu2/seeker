import React from 'react';
import { shallow } from 'enzyme';
import Results from '../Results';
import SingleResult from '../SingleResult';

describe('<Results />', () => {
  let props;

  beforeEach(() => {
    props = {
      results: [
        { title: 'foo', authors: ['abc'] },
        { title: 'bar', authors: ['def'] },
        { title: 'baz', authors: ['xyz'] },
      ]
    };
  });

  it('renders correctly without results prop', () => {
    shallow(<Results />);
  });

  it('renders the correct number of <SingleResult /> components', () => {
    const wrapper = shallow(<Results {...props} />);
    const singleResults = wrapper.find(SingleResult);

    expect(singleResults).toHaveLength(props.results.length);
  });

  it('passes down props to <SingleResult /> correctly', () => {
    const wrapper = shallow(<Results {...props} />);
    const singleResults = wrapper.find(SingleResult);

    singleResults.forEach((result, i) => {
      expect(result.prop('title')).toEqual(props.results[i].title);
      expect(result.prop('authors')).toEqual(props.results[i].authors);
    });
  });
});
