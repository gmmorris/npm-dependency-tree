import React from 'react';
import { shallow } from 'enzyme';

import withNPMDependnecies, { fetchNPMDependnecies } from './withNPMDependnecies';

test('fetchNPMDependnecies fetches a module and version using CORS', function(){
  const moduleName = 'left-pad';
  const version = '1.0.2';
  const fetch = jest.fn();
  fetch.mockReturnValue(
    Promise.resolve(
      {
        ok: true,
        json: () => ({ "cookie-parser": { "1.4.3" : { "dependencies" : {"cookie":"0.3.1","cookie-signature":"1.0.6" } } } })
      }
    )
  );
  
  return fetchNPMDependnecies(moduleName, version, fetch)
    .then(res => {

      expect(
        fetch.mock.calls.length
      ).toBe(
        1
      );
    
      expect(
        fetch.mock.calls[0][0]
      ).toEqual(
        'http://localhost:8050/left-pad/1.0.2'
      );
    
      expect(
        fetch.mock.calls[0][1]
      ).toEqual(
        {
          method: 'GET',
          header: new Headers({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }),
          mode: 'cors',
          cache: 'default'
        }
      );
    });
});

test('fetchNPMDependnecies reduces the result to the dependencies', function(){
  const moduleName = 'cookie-parser';
  const version = '1.4.3';
  const fetch = jest.fn();
  fetch.mockReturnValue(
    Promise.resolve(
      {
        ok: true,
        json: () => ({ "cookie-parser": { "1.4.3" : { "dependencies" : {"cookie":"0.3.1","cookie-signature":"1.0.6" } } } })
      }
    )
  );
  
  return fetchNPMDependnecies(moduleName, version, fetch)
    .then(res => {
    
      expect(
        res
      ).toEqual(
        { "dependencies" : {"cookie":"0.3.1","cookie-signature":"1.0.6" } }
      );
    });
});

test('fetchNPMDependnecies reduces the result to the devDependencies', function(){
  const moduleName = 'cookie-parser';
  const version = '1.4.3';
  const fetch = jest.fn();
  fetch.mockReturnValue(
    Promise.resolve(
      {
        ok: true,
        json: () => ({ "cookie-parser": { "1.4.3" : { "devDependencies" : {"cookie":"0.3.1","cookie-signature":"1.0.6" } } } })
      }
    )
  );
  
  return fetchNPMDependnecies(moduleName, version, fetch)
    .then(res => {
    
      expect(
        res
      ).toEqual(
        { "devDependencies" : {"cookie":"0.3.1","cookie-signature":"1.0.6" } }
      );
    });
});

test('fetchNPMDependnecies reduces the result to the dependencies and devDependencies', function(){
  const moduleName = 'cookie-parser';
  const version = '1.4.3';
  const fetch = jest.fn();
  fetch.mockReturnValue(
    Promise.resolve(
      {
        ok: true,
        json: () => ({ "cookie-parser": { "1.4.3" : { "dependencies" : {"cookie":"0.3.1"}, "devDependencies" : {"cookie-signature":"1.0.6" }} } })
      }
    )
  );
  
  return fetchNPMDependnecies(moduleName, version, fetch)
    .then(res => {
    
      expect(
        res
      ).toEqual(
        {
          "dependencies" : {"cookie":"0.3.1"},
          "devDependencies" : {"cookie-signature":"1.0.6"},
        }
      );
    });
});