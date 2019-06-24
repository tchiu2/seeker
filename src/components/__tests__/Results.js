import React from 'react';
import { shallow } from 'enzyme';
import Results from '../Results';
import SingleResult from '../SingleResult';

describe('<Results />', () => {
  it('renders without issues', () => {
    shallow(<Results />);
  });

  it('renders the correct number of <SingleResult /> components', () => {
    const results = [
      { title: "foo" },
      { title: "bar" },
      { title: "baz" },
    ];
    
    const wrapper = shallow(<Results results={results} />);
    const singleResults = wrapper.find(SingleResult);

    expect(singleResults).toHaveLength(results.length);
  });
});
