import React from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';
import Docs from './docs';
import Examples from './examples'
import Library from './components';
import Intro from './intro';
import PageNav from './page-nav';
import './style/normalize.css';
import './style/skeleton.css'
import './style/main.css';

const Demo = () => (
  <div className="container u-full-width app">
    <header className="row header">
      <div className="five columns site-branding">
        <h1 className="site-title">WP-GraphQL Composer</h1>
        <h1 className="site-description"><small>The WordPress Component Composer...</small></h1>
      </div>
      <nav className="seven columns main-navigation">
        <ul>
          <li><NavLink to="/">Getting Started</NavLink></li>
          <li><NavLink to="/lib">Components</NavLink></li>
          <li><NavLink to="/examples">Examples</NavLink></li>
          <li><NavLink to="/docs">Documentation</NavLink></li>
        </ul>
      </nav>
    </header>
    <aside className="row page-navigation"><PageNav /></aside>
    <main className="row main">
      <Switch>
        <Route exact path="/lib(.*)" component={Library} />
        <Route exact path="/examples(.*)" component={Examples} />
        <Route exact path="/docs(.*)" component={Docs} />
        <Route exact path="/" component={Intro} />
      </Switch>
    </main>
  </div>
);

export default Demo;
