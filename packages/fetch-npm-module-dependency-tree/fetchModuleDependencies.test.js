const fetchModuleDependencies = require('./fetchModuleDependencies');

it(`fetches a module by it's version from the NPM registry`, () => {
  const moduleName = 'left-pad';
  const version = '1.0.2';
  const fetch = jest.fn();
  fetch.mockReturnValue(Promise.resolve({ ok: true, json: () => ({}) }));
  
  return fetchModuleDependencies(moduleName, version, fetch)
    .then(() => {
      expect(
        fetch.mock.calls.length
      ).toBe(
        1
      );
    
      expect(
        fetch.mock.calls[0][0]
      ).toEqual(
        'https://registry.npmjs.org/left-pad/1.0.2'
      );
    });
});

it(`resolves with an error if the fetch fails`, () => {
  const moduleName = '££@@!!';
  const version = '1.0.2';
  const fetch = jest.fn();
  fetch.mockReturnValue(Promise.reject(new Error('OMG o_O')));
  
  return fetchModuleDependencies(moduleName, version, fetch)
    .then(e =>{
      expect(
        e
      ).toMatchObject(
        {
          error: `OMG o_O`
        }
      );
    });
});

it(`resolves with an error if the fetch isnt valid`, () => {
  const moduleName = '££@@!!';
  const version = '1.0.2';
  const fetch = jest.fn();
  fetch.mockReturnValue(Promise.resolve(({})));
  
  return fetchModuleDependencies(moduleName, version, fetch)
    .then(e =>{
      expect(
        e
      ).toMatchObject(
        {
          error: `couldn't locate module ££@@!!@1.0.2`
        }
      );
    });
});

it(`resolves with the module's version and dependencies`, () => {
  const moduleName = 'cookie-parser';
  const version = 'latest';
  const fetch = jest.fn();
  fetch.mockReturnValue(
    Promise.resolve(
      {
        ok: true,
        json: () => ({"name":"cookie-parser","version":"1.4.3","dependencies":{"cookie":"0.3.1","cookie-signature":"1.0.6"}})
      }
    )
  );
  
  return fetchModuleDependencies(moduleName, version, fetch)
  .then(res =>{
    expect(
      res
    ).toMatchObject(
      {
        "cookie-parser": {
          "latest": {
            "dependencies": {
              "cookie":"0.3.1",
              "cookie-signature":"1.0.6"
            }
          }
        }
      }
    );
  });
});

it(`resolves with the module's version and devDependencies`, () => {
  const moduleName = 'cookie-parser';
  const version = 'latest';
  const fetch = jest.fn();
  fetch.mockReturnValue(
    Promise.resolve(
      {
        ok: true,
        json: () => ({"name":"cookie-parser","version":"1.4.3","devDependencies":{"istanbul":"0.4.3","mocha":"2.5.3","supertest":"1.1.0"}})
      }
    )
  );
  
  return fetchModuleDependencies(moduleName, version, fetch)
    .then(res =>{
      expect(
        res
      ).toMatchObject(
        {
          "cookie-parser": {
            "latest": {
              "devDependencies": {
                "istanbul":"0.4.3",
                "mocha":"2.5.3",
                "supertest":"1.1.0"
              }
            }
          }
        }
      );
    });
});

it(`resolves with the both types of dependencies when both are present`, () => {
  const moduleName = 'cookie-parser';
  const version = 'latest';
  const fetch = jest.fn();
  fetch.mockReturnValue(
    Promise.resolve(
      {
        ok: true,
        json: () => ({"name":"cookie-parser","version":"1.4.3","dependencies":{"cookie":"0.3.1","cookie-signature":"1.0.6"},"devDependencies":{"istanbul":"0.4.3","mocha":"2.5.3","supertest":"1.1.0"}})
      }
    )    
  );
  
  return fetchModuleDependencies(moduleName, version, fetch)
    .then(res =>{
      expect(
        res
      ).toMatchObject(
        {
          "cookie-parser": {
            "latest": {
              "dependencies": {
                "cookie":"0.3.1",
                "cookie-signature":"1.0.6"
              },
              "devDependencies": {
                "istanbul":"0.4.3",
                "mocha":"2.5.3",
                "supertest":"1.1.0"
              }
            }
          }
        }
      );
    });
});