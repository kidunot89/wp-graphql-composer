export const archives = `
  const App = () => (
    <Archive first={5} />
  );

  render(
    <Provider>
      <App />
    </Provider>
  );
`;

export const attachment = `
  //Custom Attachment View Component
  const view = props => props.src ? (<img {...props} />) : null;
  
  const Attachment = attachment.compose({ view });

  const App = () => (
    <Attachment mediaItemId={1692} />
  );

  render(
    <Provider>
      <App />
    </Provider>
  );

`;

export const error = `
  const App = () => (
    <div style={{ width: '500px', height: '500px' }}>
      <Error message="An error has occurred" />
    </div>
  );

  render(
    <Provider>
      <App />
    </Provider>
  );

`;

export const footer = `
  const App = () => (
    <Footer />
  );

  render(
    <Provider>
      <App />
    </Provider>
  );
`;

export const header = `
  const App = () => (
    <Header />
  );

  render(
    <Provider>
      <App />
    </Provider>
  );

`;

export const loading = `
  const App = () => (
    <div style={{ width: '500px', height: '500px' }}>
      <Loading message="Loading..." />
    </div>
  );

  render(
    <Provider>
      <App />
    </Provider>
  );

`;

export const login = `
  const App = () => (
    <Login />
  );

  render(
    <Provider>
      <App />
    </Provider>
  );

`;

export const main = `
  const App = () => (
    <React.Fragment>
      <div className="live-header">
        <Menu location="PRIMARY" />
      </div>
      <div className="live-main">
        <Main />
      </div>
    </React.Fragment>
  );

  render(
    <Provider>
      <Router>
        <App />
      </Router>
    </Provider>
  );

`;

export const menu = `
  const App = () => (
    <div className="app">
      <Menu location="SOCIAL" />
    </div>
  );

  render(
    <Provider>
      <App />
    </Provider>
  );

`;

export const page = `
  const App = () => (
    <div style={{ width: '100%', margin: '0 2em' }}>
      <Page id="cGFnZTo3MzM=" />
    </div>
  );

  render(
    <Provider>
      <App />
    </Provider>
  );
`;

export const post = `
  const App = () => (
    <div style={{ width: '100%', margin: '0 2em' }}>
      <Post id="cG9zdDoxMDEx" />
    </div>
  );

  render(
    <Provider>
      <App />
    </Provider>
  );
`;

export const postComments = `
  const App = () => (
    <div style={{ width: '100%', margin: '0 2em' }}>
      <PostComments id="cG9zdDoxMTQ4" />
    </div>
  );

  render(
    <Provider>
      <App />
    </Provider>
  );
`;

export const profile = `

`;

export const provider = `
  const App = () => (
    <Post slug="hello-world" />
  );

  // Enter WPGraphQL endpoint
  const link = new HttpLink({ uri: '/' });

  render(
    <WPProvider link={link}>
      <App />
    </WPProvider>
  );
`;