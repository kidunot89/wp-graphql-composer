import React from 'react';
import { HttpLink } from 'apollo-link-http';

import { WPProvider } from 'lib';
import GettingStarted from './getting-started';
import Usage from './usage';
import ModComponents from './modifying-components';
import NewComponents from './new-components';

const httpLink = new HttpLink({ uri: '/graphql', credentials: 'same-origin' });

const provider = ({ children }) => (
  <WPProvider link={httpLink}>
   {children}
  </WPProvider>
);

const intro = () => {
  return (
    <React.Fragment>
      <section id="what">
        <h2>What is WP-GraphQL Composer?</h2>
        <p>WP-GraphQL Composer is a library of React components that does most of the the legwork for
          creating a React-Apollo Wordpress theme.</p>
        <p>The components within this library are make up of reusable Higher-Order-Components that are wrapped around a "React Stateless Component" 
          using Andrew Clark's Recompose library. This library was created to be an extension of the WPGraphQL plugin, and component and their queries
          won't work without a GraphQL server serving a Schema not identical to the created by the plugin. I'd recommend using it because no other
          GraphQL server for WordPress has been developed to my knowledge</p>
      </section>
      <section id="offer">
        <h3>What Does It Offer?</h3>
        <p>An easy solution to quickly creating a React app served by WordPress</p>
      </section>
      <GettingStarted id="getting-started" provider={provider} />
      <Usage id="usage" provider={provider} />
      <ModComponents id="modify" provider={provider} />
      <NewComponents id="new" provider={provider} />
    </React.Fragment>
  )
}

export default intro;
