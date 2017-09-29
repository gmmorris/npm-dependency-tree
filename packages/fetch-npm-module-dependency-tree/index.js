const restify = require('restify');
const memoize = require('fast-memoize');
const fetchModuleDependencies = require('./fetchModuleDependencies');

const server = restify.createServer({ name: 'npm-module-dep-fetcher', version: '1.0.0' });
// server.use(restify.CORS());

const sendAsJSON = res => value => res.json(200, value);
const sendErrorAsJSON = res => () => res.json(500, { error: 'Internal Server Error' });

const handleModuleDepRequest = memoize(fetchModuleDependencies);

server.get('/:npmModule/:version', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  handleModuleDepRequest(req.params.npmModule, req.params.version)
    .then(sendAsJSON(res))
    .catch(sendErrorAsJSON(res))
    .then(next);
});

server.get('/:npmModule', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  handleModuleDepRequest(req.params.npmModule, 'latest')
    .then(sendAsJSON(res))
    .catch(sendErrorAsJSON(res))
    .then(next);
});

server.listen(8030, function () {
  console.log('%s listening at %s', server.name, server.url);
});