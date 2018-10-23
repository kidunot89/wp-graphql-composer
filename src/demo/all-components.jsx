import React from 'react';

import { 
  Attachment, Header, Main, Menu,
  Page, Post, PostComments, Archive,
  Loading, Error, Login
} from 'lib';

import styles from './all-components.module.scss';

class AllComponents extends React.Component {
  render() {
    return (
      <main className={styles.main}>
        <h2>Attachment</h2>
        <div className={styles.container}>
          <Attachment id="YXR0YWNobWVudDozOA==" />
        </div>

        <h2>Page</h2>
        <div className={styles.container}>
          <Page id="cGFnZToxNzIy" />
        </div>

        <h2>Post</h2>
        <div className={styles.container}>
          <Post id="cG9zdDox" />
        </div>

        <h3>PostComments</h3>
        <div className={styles.container}>
          <PostComments id="cG9zdDox" />
        </div>
        <div className={styles.container}>
          <Archive search="Hello world!" />
        </div>
        <div className={styles.container}>
          <Header />
        </div>
        <div className={styles.container}>
          <Menu id="TWVudToxOTM=" />
        </div>
        <div className={styles.container}>
          <Login />
        </div>
        <div className={styles.container}>
          <Error />
        </div>
        <div className={styles.container}>
          <Loading />
        </div>
        <div className={styles.container}>
          <Main />
        </div>
      </main>
    );
  }
}

export default AllComponents;
