import React from 'react';
import { render } from "react-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import { HttpLink } from 'apollo-link-http';
import { WPProvider } from 'provider';
import App from './demo/app'

// Create HttpLink
const httpLink = new HttpLink({
  uri: '/graphql',
  credentials: 'same-origin',
});

const basename = (process.env.NODE_ENV === 'production') ? '/composer' : '/';

render(
  <WPProvider link={httpLink}>
    <Router basename={basename}>
      <App />
    </Router>
  </WPProvider>,
  document.getElementById("root")
);
