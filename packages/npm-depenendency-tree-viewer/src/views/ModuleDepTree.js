import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash.isempty';

import DependencyList from './DependencyList';
import './ModuleDepTree.css';

import moduleIcon from './icons/module.svg';

const ModuleDepTree = ({ module: npmModule, version, dependencies = {}, devDependencies = {}, className = '' }) => {
  return (
    <ul className={`module-list ${className}`}>
      <strong style={{ display: 'block' }}>
        <img src={moduleIcon} alt="module" className="list-item-icon" />
        {npmModule}{ version ? ` @ ${version}` : '' }
      </strong>
      <li>
      { isEmpty(dependencies) && isEmpty(devDependencies) ? 'No Dependencies' : null }
      { isEmpty(dependencies) ? null : <DependencyList dependencies={dependencies}/> }
      { isEmpty(devDependencies) ? null : <DependencyList dependencies={devDependencies} type="Dev Dependencies"/> }
      </li>
    </ul>
  )
}

ModuleDepTree.propTypes = {
  module: PropTypes.string.isRequired,
  version: PropTypes.string,
  className: PropTypes.string,
  dependencies: PropTypes.object,
  devDependencies: PropTypes.object
}

export default ModuleDepTree;