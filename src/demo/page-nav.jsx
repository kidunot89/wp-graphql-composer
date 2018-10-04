import React from 'react';
import { Switch, Route } from 'react-router-dom';

const pageNav = () => (
  <Switch>
    <Route path="/lib" render={() => (
      <ul data-heading="Components">
        <li><a href="#attachment">Attachment</a></li>
        <li><a href="#footer">Footer</a></li>
        <li><a href="#header">Header</a></li>
        <li><a href="#login">Login</a></li>
        <li><a href="#main">Main</a></li>
        <li><a href="#menu">Menu</a></li>
        <li><a href="#page">Page</a></li>
        <li><a href="#post">Post</a></li>
        <li><a href="#sidebar">Sidebar</a></li>
        <li><a href="#widgets">Widgets</a></li>
        <li><a href="#wpprovider">WPProvider</a></li>
      </ul>
    )} />
    <Route path="/docs" render={() => null}/>
    <Route exact path="/" render={() => (
      <ul data-heading="Sections">
        <li><a href="#what">What is WP-GraphQL Composer?</a></li>
        <li><a href="#offer">What Does It Offer?</a></li>
        <li><a href="#getting-started">Getting Started</a></li>
        <li><a href="#usage">Usage</a></li>
        <li><a href="#modify">Modifying Pre-Composed Components</a></li>
        <li><a href="#new">Composing New Components</a></li>
      </ul>
    )} />
  </Switch>
);

export default pageNav;
