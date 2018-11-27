# What is WP-GraphQL Composer?
WP-GraphQL Composer is a [React](https://reactjs.org) components library/toolkit that does most of the the legwork for creating a Wordpress theme and plugin powered by [React-Apollo](https://www.apollographql.com/docs/react/).

The components within this library are make up of reusable [Higher-Order-Components](https://reactjs.org/docs/higher-order-components.html) that are wrapped around a [React Stateless Component](https://reactjs.org/docs/components-and-props.html) using Andrew Clark's [Recompose](https://recompose.docsforhumans.com/) library. This library was created to be an extension of the [WPGraphQL](https://wpgraphql.com/) plugin, and component and their queries won't work without a [GraphQL](https://graphql.org/) server serving a Schema not identical to the created by the plugin. I'd recommend using it because no other GraphQL server for WordPress has been developed *to my knowledge*.

## What Does It Offer?
An easy solution to quickly creating a React-Apollo apps for [WordPress](https://wordpress.org) sites exposed by WPGraphQL

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

## Component Usage
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
2. Next create new components to be the new view layers for the menu, menu item, and sub menu components. You don't have to change all three for but I am just to show how its done.
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

## Creating New Composers
You can create a completely new composer function using the helper composer functions in `lib/composers`. There are two primary functions made `baseComposer` and `queryComposer`. They are similar but their uses are little different.

`baseComposer` - composers created from the function create a composer wrapped in an loading component, errorComponent, and propMapper. Example below.

```
const composer = baseComposer({
  // default view layer component
  view: ViewComponent,
  // default properties passed to loading state handler 
  loading: { view: LoadingViewComponent, cond: props => !!props.loading },
  // default properties passed to error state handler
  error: { view: ErrorViewComponent, errorType: 'error', errorProp: 'error' },
  // default HOCs wrapped around the mapper and view layer component
  extraHocs: [],
  // default mapper function
  mapper: props => props,
  // all other parameters are pass to the view component as a prop.
  ...extraDefaults,
})

// all default values can be overwritten in composed instances
const ComposedComponent = composer({ view, loading, error, extraHocs, mapper }) 
```

`queryComposer` - similar to `baseComposer` but it includes conditional GraphQL HOCs each can have a `cond` function prop and `mapper`.
```
const composer = queryComposer({
  // default view layer component
  view: ViewComponent,
  // default query properties
  queries: [{ query: GRAPHQL_QUERY, config: { options: {...}, ... }, mapper }]
  // default properties passed to loading state handler
  loading: { view: LoadingViewComponent, cond: props => !!props.loading }, 
  // default properties passed to error state handler
  error: { view: ErrorViewComponent, errorType: 'error', errorProp: 'error' }, 
  // default HOCs wrapped around the mapper and view layer component
  extraHocs: [],
  // default mapper function shared by all queries
  sharedMapper: props => props,
  // all other parameters are pass to the view component as a props.
  ...extraDefaults,
})

// just like with baseComposer all default values can be overwritten in composed instances
const ComposedComponent = composer({ view, queries, loading, error, extraHocs, mapper }) 
```

## Components
- Archives
- Attachment
- Header - Unusable until WPGraphQL PR#571 merged
- Main - Schema patch needed. Read more below.
- Menu
- Page
- Post
- PostComments
- Login
- UserControls

## Util Components
- Error
- Icon
- Loading

## Composer Functions
- BaseComposer
- QueryComposer
- UtilComposer

## Higher-Order Components
- whileLoading
- forError
- composeQuery

## Project Structure
```
├── bin
├── dist
│   ├── index.js
│   ├── index.js.map
│   ├── index.module.js
│   └── index.module.js.map
├── src
│   ├── ... - components
│   └── index.js - library exporter
├── test
│   ├── __unit_tests__ - component tests
│   ├── __util_tests__ - util component tests
│   ├── composers.test.js - composer function and HOC tests
│   └── fragmentTypes.json - Introspection data for Apollo test utils
├── .babelrc
├── .gitignore
├── .npmignore
├── CHANGELOG
├── CODE_OF_CONDUCT.md
├── LICENSE
├── package.json
├── README.md
├── rollup.config.js
└── package.json 
```

## Schema patch
By default some WP settings aren't exposed by WPGraphQL. This is due to the fact that these settings are loaded using WordPress's Option API. While there have been talks of patching these settings in WPGraphQL nothing has been done as of yet. To get around this issue the settings can be added to the WPGraphQL schema manually. Below is an example that you can copy and patch into your theme's `functions.php` or plugin's `[plugin-name].php`. These are also the settings needed by a couple of the components in the library.
```
use GraphQLRelay\Relay;
use \WPGraphQL\Data\DataSource;

function wp_graphql_schema_patch() {
  register_graphql_fields( 'Settings', [
    /** 
     * Defines the page_on_front setting
     */
    'pageOnFront' => [
      'type' => 'ID',
      'description' => __( 'The page that should be displayed on the front page' ),
      'resolve' => function() {
        $id = get_option( 'page_on_front', null );
        return ! empty( $id ) ? Relay::toGlobalId( 'page', $id ) : null;
      },
    ],

    /** 
     * Defines the page_for_posts setting
     */
    'pageForPosts' => [
      'type' => 'String',
      'description' => __( 'The page that displays posts' ),
      'resolve' => function() {
        $id = get_option( 'page_for_posts' );
        return ! empty( $id ) ? DataSource::resolve_post_object( $id, 'page' )->post_name : null;
      },
    ],

    /** 
     * Defines the show_avatar setting
     */
    'showAvatars' => [
      'type' => 'Boolean',
      'description' => __( 'Avatar Display' ),
      'resolve' => function() {
        return get_option( 'show_avatars', false );
      },
    ],

    /** 
     * Defines the users_can_register setting
     */
    'usersCanRegister' => [
      'type' => 'Boolean',
      'description' => __( 'Anyone can register' ),
      'resolve' => function() {
        return get_option( 'users_can_register', false );
      },
    ],

    /** 
     * Defines the permalink_structure setting
     */
    'permalinkStructure' => [
      'type' => 'String',
      'description' => __( 'The structure of the blog\'s permalinks.' ),
      'resolve' => function() {
        return get_option( 'permalink_structure' );
      },
    ],

    /** 
     * Defines the home_url setting
     */
    'homeUrl' => [
      'type' => 'String',
      'description' => __( 'The url to current site. Use this if site is a multisite' ),
      'resolve' => function() {
        return home_url();
      },
    ],
  ] );

  /** 
   * Holds the post type object permalink field
   */
  $permalink = [
    'type' 				=> 'String',
    'args' 				=> [
      'leavename' => [
        'type' 				=> 'Boolean',
        'description' => __( 'Whether to keep post name or page name' ),
      ],
    ],
    'description' 	=> __( 'The permalink to the post object' ),
    'resolve' => function( \WP_Post $post, $args ) {
      if ( ! empty( $args['leavename'] ) && $args['leavename'] ) {
        $leavename = true;
      } else {
        $leavename = false;
      }

      /**
      * Strip site url for routing use
      */
      $permalink = str_replace( home_url() . '/', '', get_permalink( $post, $leavename ) );
      return ( $permalink ) ? $permalink : null;
    },
  ];
  register_graphql_field( 'post', 'permalink', $permalink );
  register_graphql_field( 'page', 'permalink', $permalink );
  register_graphql_field( 'attachment', 'permalink', $permalink );

  $isGutenPost = [
    'type' 				=> 'Boolean',
    'description' 	=> __( 'Is post made with the Gutenberg' ),
    'resolve' => function( \WP_Post $post, $args ) {
      $is_guten_post = preg_match("/<!-- wp:(.*) -->/", $post->post_content ) ? true : false;
      return $is_guten_post;
    },
  ];
  register_graphql_field( 'post', 'isGutenPost', $isGutenPost );
  register_graphql_field( 'page', 'isGutenPost', $isGutenPost );
}
add_action( 'graphql_register_types', 'function wp_graphql_schema_patch' );
```