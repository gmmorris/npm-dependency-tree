import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ConnectedNPMModule from '../containers/ConnectedNPMModule';

import './DependencyList.css';
import zoomIcon from './icons/zoom.svg';

class DependencyList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: []
    };
  }
  expand(moduleName) {
    this.setState({
      expanded: [
        ...this.state.expanded,
        moduleName
      ]
    });
  }
  isExpanded(moduleName) {
    return this.state.expanded[moduleName]
  }
  render() {
    const { type, onExpandRequested, dependencies } = this.props;
    const { expanded } = this.state;

    return (
      <div>
        <em>{type}</em>
        <ul className="dep-list">
          {
            Object.entries(dependencies)
              .map(([moduleName, version], index) =>
                (
                  expanded.includes(moduleName)
                  ? (
                    <li key={`dep-${index}`}>
                      <ConnectedNPMModule module={moduleName} version={version}/>
                    </li>
                  )
                  : (
                    <li key={`dep-${index}`}>
                      <img src={zoomIcon} alt="expand" className="list-item-icon" onClick={() => this.expand(moduleName)} />
                      {moduleName} @ {version}
                    </li>
                  )
                )              
              )
          }
        </ul>
      </div>
    )
  }
}

DependencyList.defaultProps = {
  type: 'Dependencies',
  dependencies: {},
  onExpandRequested: () => {}
}

DependencyList.propTypes = {
  type: PropTypes.string,
  dependencies: PropTypes.object.isRequired
}

export default DependencyList