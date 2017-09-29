import React from 'react';
import { shallow } from 'enzyme';

import DependencyList from './DependencyList';
import ConnectedNPMModule from '../containers/ConnectedNPMModule';
import zoomIcon from './icons/zoom.svg';

it('render the dependency type', () => {
  const dependencies = {
    'cookie': '0.3.1',
    'cookie-signature': '1.0.6'
  };

  expect(
    shallow(
      <DependencyList type="devDependencies" />
    ).contains(
      <div>
        <em>devDependencies</em>
        <ul className="dep-list"></ul>
      </div>
    )
  ).toBe(true);
});

it('render the dependencies as a list', () => {
  const dependencies = {
    'cookie': '0.3.1',
    'cookie-signature': '1.0.6'
  };

  const wrapper = shallow(
    <DependencyList dependencies={dependencies} />
  );

  expect(
    wrapper.containsAllMatchingElements(
      [
        <li key="dep-1">
          <img src={zoomIcon} alt="expand" className="list-item-icon" />
          cookie @ 0.3.1
        </li>,
        <li key="dep-2">
          <img src={zoomIcon} alt="expand" className="list-item-icon" />
          cookie-signature @ 1.0.6
        </li>
      ]
    )
  ).toBe(true);
});

it('render a ConnectedNPMModule after a module is expanded', () => {
  const dependencies = {
    'cookie': '0.3.1'
  };

  const wrapper = shallow(
    <DependencyList dependencies={dependencies} />
  );

  expect(
    wrapper.containsMatchingElement(
      <ConnectedNPMModule module="cookie" version="0.3.1"/>
    )
  ).toBe(false);

  wrapper.find('img').simulate('click');

  expect(
    wrapper.containsMatchingElement(
      <ConnectedNPMModule module="cookie" version="0.3.1"/>
    )
  ).toBe(true);
});