import React from 'react';
import { HttpLink } from 'apollo-boost';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview
} from 'react-live';

import * as Lib from 'index';
import * as Archives from 'archives';
import * as Header from 'header';
import * as Main from 'main';
import * as Menu from 'menu';
import { WPProvider } from 'provider';
import * as PostType from 'post-type';
import * as User from 'user';
import * as Utils from 'utils'
import * as codes from './sample-codes';

const link = new HttpLink({ uri: '/graphql', credentials: 'same-origin' });

const Provider = ({ children }) => (
  <WPProvider link={link}>
    {children}
  </WPProvider>
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
      <h2>Post-Type</h2>
      <section id="attachment" className="live-section">
        <h3>Attachment</h3>
        <Live scope={{ ...PostType }} code={codes.attachment} />
      </section>
      <section id="page" className="live-section">
        <h3>Page</h3>
        <Live scope={{ ...PostType }} code={codes.page} />
      </section>
      <section id="post" className="live-section">
        <h3>Post</h3>
        <Live scope={{ ...PostType }} code={codes.post} />
      </section>
      <section id="archives" className="live-section">
        <h3>Archives</h3>
        <Live scope={{ ...Archives }} code={codes.archives} />
      </section>
      <section id="post-comments" className="live-section">
        <h3>PostComments</h3>
        <Live scope={{ ...PostType }} code={codes.postComments} />
      </section>

      <h2>Template Parts</h2>
      <section id="footer" className="live-section">
        <h3>Footer</h3>
        <p>Coming Soon...</p>
        {/* <Live scope={{ footer: Lib.footer }} code={codes.footer} /> */}
      </section>
      <section id="header" className="live-section">
        <h3>Header</h3>
        <Live scope={{ ...Header }} code={codes.header} />
      </section>
      <section id="main" className="live-section">
        <h3>Main</h3>
        <Live scope={{ ...Main, ...Menu, Router }} code={codes.main} />
      </section>
      <section id="menu" className="live-section">
        <h3>Menu</h3>
        <Live scope={{ ...Menu }} code={codes.menu} />
      </section>
      <section id="sidebar" className="live-section">
        <h3>Sidebar</h3>
        <p>Coming Soon...</p>
      </section>
      <section id="widgets" className="live-section">
        <h3>Widgets</h3>
        <p>Coming Soon...</p>
      </section>

      <h2>User and Authenication</h2>
      <section id="login" className="live-section">
        <h3>Login and UserControls</h3>
        <Live scope={{ ...User }} code={codes.login} />
      </section>
      <section id="profile" className="live-section">
        <h3>User Profile</h3>
        {/* <Live scope={{ ...User }} code={codes.profile} /> */}
      </section>       
      
      <h2>Helpers and Utils</h2>
      <section id="wpprovider" className="live-section">
        <h3>WPProvider</h3>
        <Live scope={{ WPProvider, HttpLink, ...PostType }} code={codes.provider} />
      </section>
      <section id="loading" className="live-section">
        <h3>Loading Component</h3>
        <Live scope={{ ...Utils }} code={codes.loading} />
      </section>
      <section id="error" className="live-section">
        <h3>Error Component</h3>
        <Live scope={{ ...Utils }} code={codes.error} />
      </section>

    </React.Fragment>
  )
}

export default library;
