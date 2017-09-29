import React, { Component } from 'react';
import pick from 'lodash.pick';
import { Maybe } from 'monet';

import './App.css';

import ConnectedNPMModule from '../containers/ConnectedNPMModule';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    const value = event.target.value.trim() || event.target.defaultValue;
    if(value.length > 0) {
      this.setState({ [event.target.name]: value});
    }
  }
  handleSubmit(event) {
    event.preventDefault();
  }
  render() {
    const selection = pick(this.state, 'module', 'version');
    return (
      <div className="App">
        <div className="App-header">
          <h2>NPM Module Dependency Tree</h2>
        </div>
        <p className="App-intro">
          To get started please specify an NPM module, and optionaly a version too.
        </p>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>
              Module:
            </label>
            <input type="text" name="module" onBlur={this.handleChange} />
          </div>
          <div>
            <label>
              Version:
            </label>
            <input type="text" defaultValue="latest" name="version" onBlur={this.handleChange} />
          </div>
        </form>
        {
          selection.module
            ? <ConnectedNPMModule className="module-tree" {...selection} />
            : null
        }        
      </div>
    );
  }
}

export default App;
