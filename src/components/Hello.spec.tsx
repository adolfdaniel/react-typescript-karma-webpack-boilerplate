import { shallow } from 'enzyme';
import * as React from 'react';

import '../setup.spec';
import Hello from './Hello';

describe('Hello Component', () => {
  it('should create a container', () => {
    const container = shallow(
      <Hello compiler="Typescript" framework="React" />,
    );

    expect(container.length).toBeGreaterThan(0);
    expect(container.text()).toBe('Hello from Typescript and React!');
  });
});
