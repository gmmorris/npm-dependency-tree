const fetchNode = require('node-fetch');
const pick = require('lodash.pick');

function fetchModuleDependencies(moduleName, version, fetch = fetchNode){
  return fetch(`https://registry.npmjs.org/${moduleName}/${version}`)
    .then(res =>
      res.ok
        ? res.json()
        : Promise.reject(new Error(`couldn't locate module ${moduleName}@${version}`))
    )
    .then(res => (
      {
        [moduleName]: {
          [version]: pick(res, ['dependencies', 'devDependencies'])
        }
      }
    ))
    .catch(e => (
      {
        error: e.message
      }
    ));
}

module.exports = fetchModuleDependencies