# What is WP-GraphQL Composer?
WP-GraphQL Composer is a library of [React](https://reactjs.org) components that does most of the the legwork for creating a [React-Apollo](https://www.apollographql.com/docs/react/) Wordpress theme.

The components within this library are make up of reusable [Higher-Order-Components](https://reactjs.org/docs/higher-order-components.html) that are wrapped around a [React Stateless Component](https://reactjs.org/docs/components-and-props.html) using Andrew Clark's [Recompose](https://recompose.docsforhumans.com/) library. This library was created to be an extension of the [WPGraphQL](https://wpgraphql.com/) plugin, and component and their queries won't work without a [GraphQL](https://graphql.org/) server serving a Schema not identical to the created by the plugin. I'd recommend using it because no other GraphQL server for WordPress has been developed to my knowledge

## What Does It Offer?
An easy solution to quickly creating a React app served by [WordPress](https://wordpress.org)

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
  const subMenuView = ({ MenuItem, SubMenu, items, ...rest }) => (
    <ol data-testid="custom-submenu" {...rest}>
      {_.map(items, ({ id, menuItemId, cssClasses, ...r}) => (
        <li key={id}>
          <MenuItem
            className={\`menuItem \${cssClasses.join(' ')}\`}
            id={id}
            {...{ ...r, MenuItem, SubMenu }}
          />
        </li>
      ))}
    </ol>
  );

  const menuItemView = ({ url, label, items, SubMenu, MenuItem, description, ...rest }) => (
    <React.Fragment>
      <Link {...{ ...rest, url }}>{label}</Link>
      {!_.isEmpty(items) && (
        <SubMenu
          className="sub-menu"
          {...{ items, SubMenu, MenuItem}}
        />
      )}
    </React.Fragment>
  );

  const customMenuView = ({ slug, className, items, MenuItem, SubMenu, ...rest }) => (
    <div id={\`menu-\${slug}\`} className={className} {...rest}>
      {_.map(items, ({ id, menuItemId, cssClasses, ...r}) => (
        <div key={id} className="menu-item">
          <MenuItem
            className={\`menuItem \${cssClasses.join(' ')}\`}
            id={id}
            {...{ ...r, MenuItem, SubMenu }}
          />
        </div>
      ))}
    </div>
  );
```
3. Last lastly use the `compose` function on each of the imported components to compose a new `CustomMenu` Component.
```
  const SubMenu = subMenu.compose({ view: subMenuView });
  const MenuItem = menuItem.compose({ view: menuItemView });
  const CustomMenu = menu.compose({
    view: customMenuView,
    MenuItem,
    SubMenu
  });

  const App = () => (
    <div className="app">
      <CustomMenu location="SOCIAL" />
    </div>
  );

  render(
    <WPProvider>
      <App />
    </WPProvider>
  );
```
You can learn more about the [Menu](https://api.axistaylor.com/composer/lib#menu) component and the rest of the library in the [Components](https://api.axistaylor.com/composer/lib) and [Documentation](https://api.axistaylor.com/composer/docs) sections.

## Creating New Composers
You can create a completely new composer function using the helper composer functions in `lib/composers`. There are two primary functions made `baseComposer` and `queryComposer`. They are similar but their uses are little different.

`baseComposer` - composers created from the function create a composer wrapped in an loading component, errorComponent, and propMapper. Example below.

```
const composer = baseComposer({
  view: ViewComponent, // default view layer component
  loading: { view: LoadingViewComponent, cond: props => !!props.loading }, // default properties passed to loading handler 
  error: { view: ErrorViewComponent, errorType: 'error', errorProp: 'error' }, // default properties passed to error handler,
  extraHocs: [], // default HOCs wrapped around the mapper and view layer component
  mapper: props => props, // default mapper function
  ...extraDefaults, // all of elements are pass to the view component as a prop.
})

const ComposedComponent = composer({ view, loading, error, extraHocs, mapper }) // all default values can be overwritten in composed instances
```

`queryComposer` - similar to `baseComposer` but it includes conditional GraphQL HOCs each can have a `cond` function prop and `mapper`.
```
const composer = queryComposer({
  view: ViewComponent, // default view layer component
  queries: [{ query: GRAPHQL_QUERY, config: { options: {...}, ... }, mapper }] // default query properties
  loading: { view: LoadingViewComponent, cond: props => !!props.loading }, // default properties passed to loading handler 
  error: { view: ErrorViewComponent, errorType: 'error', errorProp: 'error' }, // default properties passed to error handler,
  extraHocs: [], // default HOCs wrapped around the mapper and view layer component
  sharedMapper: props => props, // default mapper function
  ...extraDefaults, // all of elements are pass to the view component as a prop.
})

const ComposedComponent = composer({ view, queries, loading, error, extraHocs, mapper }) // all default values can be overwritten in composed instances
```