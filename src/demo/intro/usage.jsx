import React from 'react';
import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview
} from 'react-live';

import { Header, Menu, Login } from 'lib';

const code = `
  const App = () => (
    <div className="app">
      <Header style={{ maxWidth: '450px', overflowX: 'hidden' }}>
        <Menu location="PRIMARY" />
        <Login />
      </Header>
    </div>
  );

  render(
    <WPProvider>
      <App />
    </WPProvider>
  );
`;

const usage = ({ provider: WPProvider, ...rest }) => (
  <section {...rest}>
    <h3>Usage</h3>
    <p>Simply import a component and pass the required props.</p>
    <LiveProvider scope={{ Header, Menu, Login, WPProvider }} code={code} noInline={true}>
      <LiveEditor />
      <LiveError />
      <LivePreview />
    </LiveProvider>
  </section>
);

export default usage;