# What is WP-GraphQL Composer?
WP-GraphQL Composer is a library of [React]() components that does most of the the legwork for creating a [React-Apollo]() Wordpress theme.

The components within this library are make up of reusable [Higher-Order-Components]() that are wrapped around a [React Stateless Component]() using Andrew Clark's Recompose library. This library was created to be an extension of the [WPGraphQL]() plugin, and component and their queries won't work without a [GraphQL]() server serving a Schema not identical to the created by the plugin. I'd recommend using it because no other GraphQL server for WordPress has been developed to my knowledge

## What Does It Offer?
An easy solution to quickly creating a React app served by [WordPress]()

## Getting Started
Run the command npm install wp-graphql-composer in a your React app directory.
Import `HttpLink` from `apollo-link-http` and `WPProvider` from `wp-graphql-composer`
And wrap you root component in a WPProvider component like so.

```
  // Create Link
  const httpLink = new HttpLink({ uri: '/graphql', credentials: 'same-origin' })
  
  // Create or import App
  const App = () => (
    <div className="app">
      {/* Menu is another component from the wp-graphql-composer package */}
      <Menu location="PRIMARY" />
    </div>
  );

  // Note link prop
  render(
    <WPProvider link={httpLink}>
      <App />
    </WPProvider>
  );
```

## Usage
Simply import a component and pass the required props.

```
  const App = () => (
    <div className="app">
      <Header>
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
```

## Modifying Pre-Composed Components
1. To create a new template for say the `Menu` component, import `menu`, `menuItem`, and `subItem` view components from `wp-graphql-composer`.
`import { menu, menuItem, subItem } from 'wp-graphql-composer';`
2. Next create new components to be the new view layers for the menu, menu item, and sub menu components. You don't have to change all three for but I am just to show how its done. I'm also using the `map` and `isEmpty` functions from the `lodash` package to help map the items.
```
  const customSubMenu = ({ Item, items, ...rest }) => (
    <ol {...rest}>
      {_.map(items, ({ id, ...rest }) => (<li key={id}><Item id={id} {...rest} /></li>))}
    </ol>
  ),
  ({ url, label, ...rest }) => (
    <a href={url} {...rest}>{label}</a>
  );

  const customMenuItem = ({ url, label, items, SubMenu, ...rest }) => (
    <React.Fragment>
      <a href={url} {...rest}>{label}</a>
      {!_.isEmpty(items) && (<SubMenu className="sub-menu" items={items} />)}
    </React.Fragment>
  );

  const customMenu = ({ slug, className, 'data-testid': dataTestId, items, MenuItem }) => (
    <div id={`menu-${slug}`} className={className} data-testid={dataTestId}>
      {_.map(items, ({ id, ...r}) => (<MenuItem key={id} id={id} {...r} />))}
    </div>
  );
```
3. Last lastly use the `compose` function on each of the imported components to compose a new `CustomMenu` Component.
```
  const CustomSubMenu = subMenu.compose(customMenu);
  const CustomMenuItem = menuItem.compose(customMenuItem, CustomMenu);
  const CustomMenu = menu.compose(customMenu, CustomMenuItem);

  const App = () => (
    <div className="app">
      <strong>Default Menu</strong>
      <Menu location="SOCIAL" />

      <strong>Custom Menu</strong>
      <CustomMenu location="SOCIAL" />
    </div>
  );

  render(
    <WPProvider>
      <App />
    </WPProvider>
  );
```
You can learn more about the [Menu]() component and the rest of the library in the [Components]() and [Documentation]() sections.

## Composing New Components
Coming soon...
