import React, { Component } from 'react';
import { createAppState, AppContext } from './app-context';
import AllComponents from './all-components';

import './app.css';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...createAppState(this),
      basename: '/composer'
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.state.updateWidthVars); 
  }

  componentWillUnmount() {
      window.removeEventListener("resize", this.state.updateWidthVars);
  }

  render() {
    return (
      <AppContext.Provider value={this.state}>
        <AllComponents />
      </AppContext.Provider>
    )
  }
}

export default App;
