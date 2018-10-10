import React from 'react';

import { Menu } from 'menu';
import { LiveProvider, LivePreview } from 'react-live';

const code = 
` 
  const App = () => (
    <div className="app">
      <Menu location="PRIMARY" horizontal />
    </div>
  );

  render(
    <WPProvider>
      <App />
    </WPProvider>
  );
`;

const gettingStarted = ({ provider: WPProvider, ...rest }) => (
  <section {...rest}>
    <h3>Getting Started</h3>
    <ul>
      <li>Run the command <code>npm install wp-graphql-composer</code> in a your React app directory.</li>
      <li>Import <code>HttpLink</code> from <code>apollo-link-http</code> and <code>WPProvider</code> from <code>wp-graphql-composer</code></li>
      <li>And wrap you root component in a <code>WPProvider</code> component like so.
        <pre>
          <code>
            {`
  // Create Link
  const httpLink = new HttpLink({ uri: '/graphql', credentials: 'same-origin' })
  
  // Create or import App
  const App = () => (
    <div className="app">
      {/* Menu is another component from the wp-graphql-composer package */}
      <Menu location="PRIMARY" horizontal />
    </div>
  );

  // Note link prop
  render(
    <WPProvider link={httpLink}>
      <App />
    </WPProvider>
  );
            `}
          </code>
        </pre>
        <LiveProvider scope={{ Menu, WPProvider }} code={code} noInline={true}>
          <LivePreview />
        </LiveProvider>
      </li>
    </ul>
  </section>
);

export default gettingStarted;
