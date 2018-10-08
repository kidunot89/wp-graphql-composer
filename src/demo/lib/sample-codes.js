export const attachment = `
  //Custom Attachment View Component
  const view = props => props.src ? (<img {...props} />) : null;
  
  const Attachment = attachment.compose({ view });

  const App = () => (
    <Attachment src="https://source.unsplash.com/480x320" />
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

export const login = `
  const App = () => (
    <div style={{ width: '100%', margin: '0 2em' }}>
      <Login />
    </div>
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
      <Menu location="PRIMARY" />
      <Main />
    </React.Fragment>
  );

  render(
    <Provider>
      <App />
    </Provider>
  );

`;

export const menu = `
  const customSubMenu = ({ itemView: Item, items, ...rest }) => (
    <ol {...rest}>
      {_.map(items, ({ id, ...rest }) => (<li key={id}><Item id={id} {...rest} /></li>))}
    </ol>
  );

  const customMenuItem = ({ url, label, items, subMenuView: SubMenu, ...rest }) => (
    <React.Fragment>
      <a href={url} {...rest} style={{ padding: "1.4em 2em", color: "#595959" }}>{label}</a>
      {!_.isEmpty(items) && (<SubMenu className="sub-menu" items={items} />)}
    </React.Fragment>
  );

  const customMenu = ({ slug, items, itemView: MenuItem, ...rest }) => (
    <div className="custom-menu" {...rest}>
      {_.map(items, ({ id, ...r}) => (<MenuItem key={id} id={id} {...r} />))}
    </div>
  );

  const CustomSubMenu = subMenu.compose({ view: customMenu });
  const CustomMenuItem = menuItem.compose({ view: customMenuItem, subMenuView: CustomMenu});
  const CustomMenu = menu.compose({ view: customMenu, itemView: CustomMenuItem});

  const App = () => (
    <div className="app">
      <CustomMenu location="SOCIAL" />
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