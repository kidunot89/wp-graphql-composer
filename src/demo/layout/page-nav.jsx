import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Collapse from './components/collapse';

const pageNav = () => (
  <Switch>
    <Route path="/composer/lib" render={() => (
      <ul className="demo-list horizontal" data-heading="Components">
        <li>
          <a href="#post-type">Post-Type</a>
          <Collapse
            className="sub-list"
            toggleClassName="sub-list-icon-toggler"
            button={(<span className="icon-arrow-down"/>)}
          >
            <ul>
              <li><a href="#attachment">Attachment</a></li>
              <li><a href="#page">Page</a></li>
              <li><a href="#post">Post</a></li>
              <li><a href="#archives">Archive</a></li>
              <li><a href="#post-comments">Post Commments</a></li>
            </ul>
          </Collapse>
        </li>
        <li>
          <a href="#post-type">Template Parts</a>
          <Collapse
            className="sub-list"
            toggleClassName="sub-list-icon-toggler"
            button={(<span className="icon-arrow-down"/>)}
          >
            <ul>
              <li><a href="#footer">Footer</a></li>
              <li><a href="#header">Header</a></li>
              <li><a href="#main">Main</a></li>
              <li><a href="#menu">Menu</a></li>
              <li><a href="#sidebar">Sidebar</a></li>
              <li><a href="#widgets">Widgets</a></li>
            </ul>
          </Collapse>
        </li>
        <li>
          <a href="#post-type">User & Auth</a>
          <Collapse
            className="sub-list"
            toggleClassName="sub-list-icon-toggler"
            button={(<span className="icon-arrow-down"/>)}
          >
            <ul>
              <li><a href="#login">UserControls</a></li>
              <li><a href="#profile">Profile</a></li>
            </ul>
          </Collapse>
        </li>
        <li>
          <a href="#post-type">Helpers & Utils</a>
          <Collapse
            className="sub-list"
            toggleClassName="sub-list-icon-toggler"
            button={(<span className="icon-arrow-down"/>)}
          >
            <ul>
              <li><a href="#wpprovider">WPProvider</a></li>
              <li><a href="#loading">Loading Component</a></li>
              <li><a href="#error">Error Component</a></li>
            </ul>
          </Collapse>
        </li>
      </ul>
    )} />
    <Route path="/composer/docs" render={() => null}/>
    <Route exact path="/composer/" render={() => (
      <ul className="demo-list" data-heading="Sections">
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
