import React from 'react';
import { shallow } from 'enzyme';

import ModuleDepTree from './ModuleDepTree';
import DependencyList from './DependencyList';

test('<ModuleDepTree />', function(){
  it('renders the Module name', () => {
    expect(
      shallow(
        <ModuleDepTree module="express" />
      ).contains(
        <strong>express</strong>
      )
    ).toBe(true);
  });
  
  it('renders the Version', () => {
    expect(
      shallow(
        <ModuleDepTree version="1.0.0" />
      ).contains(
        <strong> @ 1.0.0</strong>
      )
    ).toBe(true);
  });
  
  it('renders the both Version and Module name', () => {
    expect(
      shallow(
        <ModuleDepTree module="express" version="1.0.0" />
      ).contains(
        <strong>express @ 1.0.0</strong>
      )
    ).toBe(true);
  });
  
  it('doesnt render the dependencies when there are none', () => {
    expect(
      shallow(
        <ModuleDepTree module="express" version="1.0.0" />
      ).contains(
        <strong>dependencies</strong>
      )
    ).toBe(false);
  });
  
  it('doesnt render the devDependencies when there are none', () => {
    expect(
      shallow(
        <ModuleDepTree module="express" version="1.0.0" />
      ).contains(
        <strong>devDependencies</strong>
      )
    ).toBe(false);
  });  

  it('render the dependencies list', () => {
    const dependencies = {
      'cookie': '0.3.1',
      'cookie-signature': '1.0.6'
    };
  
    expect(
      shallow(
        <ModuleDepTree dependencies={dependencies} />
      ).contains(
        <DependencyList dependencies={dependencies} />
      )
    ).toBe(true);
  });
});