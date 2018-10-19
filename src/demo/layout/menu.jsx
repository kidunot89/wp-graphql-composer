import React from 'react';
import { menu } from ''

const view = () => {
  return (
    <nav className={`navigation ${collapse}`}>
      <ul>
          <li><NavLink exact to="/">Getting Started</NavLink></li>
          <li><NavLink to="/lib">Components</NavLink></li>
          <li><NavLink to="/examples">Examples</NavLink></li>
          <li><NavLink to="/docs">Documentation</NavLink></li>
      </ul>
    </nav>
  )
};

const item = () => {
  return null;
}

const subMenu = () => {
  return null;
}

export default menu.compose({ view, item, subMenu });
