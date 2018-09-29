import React from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';

const pageNav = () => (
  <Switch>
    <Route path="/" render={() => (
      <ul>
        <li><NavLink to="/#what">What is WP-GraphQL Composer?</NavLink></li>
        <li><NavLink to="/#offer">What Does It Offer?</NavLink></li>
        <li><NavLink to="/#getting-started">Getting Started</NavLink></li>
        <li><NavLink to="/#usage">Usage</NavLink></li>
        <li><NavLink to="/#modify">Modifying Pre-Composed Components</NavLink></li>
        <li><NavLink to="/#new">Composing New Components</NavLink></li>
        <li><NavLink to="/#comments">Comments/Thanks</NavLink></li>
      </ul>
    )} />
    <Route path="/lib" render={() => (
      <ul>
        <li><NavLink to="/lib#attachment">Attachment</NavLink></li>
        <li><NavLink to="/lib#footer">Footer</NavLink></li>
        <li><NavLink to="/lib#header">Header</NavLink></li>
        <li><NavLink to="/lib#login">Login</NavLink></li>
        <li><NavLink to="/lib#main">Main</NavLink></li>
        <li><NavLink to="/lib#menu">Menu</NavLink></li>
        <li><NavLink to="/lib#page">Page</NavLink></li>
        <li><NavLink to="/lib#post">Post</NavLink></li>
        <li><NavLink to="/lib#sidebar">Sidebar</NavLink></li>
        <li><NavLink to="/lib#widgets">Widgets</NavLink></li>
        <li><NavLink to="/lib#wpprovider">WPProvider</NavLink></li>
      </ul>
    )} />
    <Route path="/docs" render={() => null}/>
  </Switch>
);

export default pageNav;
