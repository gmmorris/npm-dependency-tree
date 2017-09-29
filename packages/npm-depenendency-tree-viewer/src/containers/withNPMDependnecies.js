import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Maybe } from 'monet';

import './withNPMDependnecies.css';

import loading from './loading.svg';

export function fetchNPMDependnecies(npmModule, version, fetchModule = fetch) {
  return fetchModule(
    `http://localhost:8050/${npmModule}/${version}`,
    {
      method: 'GET',
      header: new Headers({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }),
      mode: 'cors',
      cache: 'default'
    }
  )
  .then(res => res.ok
    ? res.json()
    : Promise.reject(new Error(`couldn't fetch module ${npmModule}@${version}`))
  )
  .then(moduleResult => {
    return Maybe.Some(moduleResult)
      .flatMap(moduleResult => {
        return Maybe.fromNull(moduleResult[npmModule])
      })
      .flatMap(versions => Maybe.fromNull(versions[version]))
      .orSome({})
  }
  )
  .catch(e => (
    {
      error: e
    }
  ))
}

const ErrorLabel = ({npmModule, version, error})  => (
  <div>
    <em>Error loading {npmModule}@{version}. :(</em>
    <strong style={{ display: 'block' }}>{error.message}</strong>
  </div>
);

const LoadingLabel = ({npmModule, version})  => (
  <div>
    <img src={loading} className="loading" alt="loading" /> {npmModule}@{version}
  </div>
);

function withNPMDependnecies(WrappedComponent) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {};
      this.fetchDependnecies = this.fetchDependnecies.bind(this);
    }
    componentWillReceiveProps(nextProps) {
      if(nextProps.module !== this.props.module || nextProps.version !== this.props.version) {
        this.setState({
          dependencies: null,
          devDependencies: null,
          error: null
        });
        this.fetchDependnecies(nextProps.module, nextProps.version);
      }
    }
    componentDidMount() {
      this.fetchDependnecies(this.props.module, this.props.version);
    }
    fetchDependnecies(module, version) {
      fetchNPMDependnecies(module, version)
        .then(result => {
          this.setState({
            module: {
              ...result
            }
          });
        });
    }
    render() {
      const { module: npmModule, version } = this.props;
      const { module : moduleDependencies, error } = this.state;
      return (
        moduleDependencies
        ? <WrappedComponent  {...this.props} dependencies={moduleDependencies.dependencies} devDependencies={moduleDependencies.devDependencies} />
        : (
          error
          ? <ErrorLabel npmModule={npmModule} version={version} error={error}/>
          : <LoadingLabel npmModule={npmModule} version={version} />
        )
      )
    }
  }
}

export default withNPMDependnecies;
