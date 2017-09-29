import React from 'react';
import PropTypes from 'prop-types';

import withNPMDependnecies from './withNPMDependnecies';
import ModuleDepTree from '../views/ModuleDepTree';

const ConnectedNPMModule = withNPMDependnecies(ModuleDepTree)

ConnectedNPMModule.propTypes = {
  module: PropTypes.string.isRequired,
  version: PropTypes.string
}

ConnectedNPMModule.defaultProps = {
  version: 'latest'
}

export default ConnectedNPMModule