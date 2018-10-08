import React from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';

import Docs from './docs';
import Examples from './examples'
import Library from './lib';
import Intro from './intro';
import PageNav from './page-nav';
import 'lib/style.css';
import './main.css';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.isDesktop = this.isDesktop.bind(this);
    this.toggleNav = this.toggleNav.bind(this);
    this.togglePageNav = this.togglePageNav.bind(this);
    this.state = {
      isCollapsed: true,
      isCollapsed2: true,
    };
  }

  componentWillMount() {
    this.isDesktop();
  }

  isDesktop() {
    let isCollapsed = true;
    let isCollapsed2 = true;
    
    if (window.innerWidth >= 992) isCollapsed = false;
    if (window.innerWidth >= 768) isCollapsed2 = false;

    this.setState({ isCollapsed, isCollapsed2 });
  }

  toggleNav() {
    this.setState({ isCollapsed: !this.state.isCollapsed })
  }

  togglePageNav() {
    this.setState({ isCollapsed2: !this.state.isCollapsed2 })
  }

  render() {
    const collapse = (this.state.isCollapsed) ? 'collapse is-collapsed' : 'collapse';
    const collapse2 = (this.state.isCollapsed2) ? 'collapse is-collapsed' : 'collapse';

    return (
      <div className="app">
        <header className="demo-header">
          <div className="branding">
            <h1 className="title">WP-GraphQL Composer</h1>
            <h1 className="description"><small>The WordPress Component Composer...</small></h1>
          </div>
          <div className="toggler">
            <button className={collapse} onClick={this.toggleNav}></button>
          </div>
            <nav className={`navigation ${collapse}`}>
              <ul>
                  <li><NavLink exact to="/">Getting Started</NavLink></li>
                  <li><NavLink to="/lib">Components</NavLink></li>
                  <li><NavLink to="/examples">Examples</NavLink></li>
                  <li><NavLink to="/docs">Documentation</NavLink></li>
              </ul>
            </nav>
        </header>
        <aside className="demo-aside">
          <nav className={`navigation ${collapse2}`}>
            <PageNav />
          </nav>
          <div className="toggler">
            <button className={collapse2} onClick={this.togglePageNav}></button>
          </div>
        </aside>
        <main className="demo-main">
          <Switch>
            <Route exact path="/" component={Intro} />
            <Route path="/lib(.*)" component={Library} />
            <Route path="/examples(.*)" component={Examples} />
            <Route path="/docs(.*)" component={Docs} />
          </Switch>
        </main>
        <footer className="demo-footer"></footer>
      </div>
    );
  }
}

export default Demo;
