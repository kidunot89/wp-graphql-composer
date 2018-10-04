import React from 'react';
import { HttpLink } from 'apollo-boost';
import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview
} from 'react-live';

import * as Lib from 'lib';
import * as codes from './sample-codes';

const link = new HttpLink({ uri: '/graphql', credentials: 'same-origin' });

const Provider = ({ children }) => (
  <Lib.WPProvider link={link}>
    {children}
  </Lib.WPProvider>
);

const Live = ({ scope, code }) => (
  <LiveProvider scope={{ ...scope, Provider }} code={code} noInline={true}>
    <LiveEditor className="block" />
    <LiveError />
    <LivePreview className="block" />
  </LiveProvider>
);

const library = () => {
  return (
    <React.Fragment>
      <section id="attachment" className="live-section">
        <h3>Attachment</h3>
        <Live scope={{ attachment: Lib.attachment }} code={codes.attachment} />
      </section>
      <section id="footer" className="live-section">
        <h3>Footer</h3>
        <p>Coming Soon...</p>
        {/* <Live scope={{ footer: Lib.footer }} code={codes.footer} /> */}
      </section>
      <section id="header" className="live-section">
        <h3>Header</h3>
        <Live scope={{ Header: Lib.Header }} code={codes.header} />
      </section>
      <section id="login" className="live-section">
        <h3>Login</h3>
        <Live scope={{ Login: Lib.Login }} code={codes.login} />
      </section>
      <section id="main" className="live-section">
        <h3>Main</h3>
        <p>Coming Soon...</p>
        {/* <Live scope={{ Main: Lib.Main, Menu: Lib.Menu }} code={codes.main} /> */}
      </section>
      <section id="menu" className="live-section">
        <h3>Menu</h3>
        <Live scope={{ menu: Lib.menu, menuItem: Lib.menuItem, subMenu: Lib.subMenu }} code={codes.menu} />
      </section>
      <section id="page" className="live-section">
        <h3>Page</h3>
        <Live scope={{ page: Lib.page }} code={codes.page} />
      </section>
      <section id="post" className="live-section">
        <h3>Post</h3>
        <Live scope={{ post: Lib.post }} code={codes.post} />
      </section>
      <section id="post" className="live-section">
        <h3>PostComments</h3>
        <Live scope={{ postComments: Lib.postComments }} code={codes.postComments} />
      </section>
      <section id="sidebar" className="live-section">
        <h3>Sidebar</h3>
        <p>Coming Soon...</p>
      </section>
      <section id="widgets" className="live-section">
        <h3>Widgets</h3>
        <p>Coming Soon...</p>
      </section>
      <section id="wpprovider" className="live-section">
        <h3>WPProvider</h3>
        <p>Coming Soon...</p>
      </section>

    </React.Fragment>
  )
}

export default library;
