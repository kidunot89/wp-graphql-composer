import React from 'react';
import { render } from "react-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import { HttpLink } from 'apollo-link-http';
import { WPProvider } from 'provider';
import Demo from './demo'

// Create HttpLink
const httpLink = new HttpLink({
  uri: '/graphql',
  credentials: 'same-origin',
});

render(
  <WPProvider link={httpLink}>
    <Router basename="/composer">
      <Demo />
    </Router>
  </WPProvider>,
  document.getElementById("root")
);
