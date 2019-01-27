# WPGraphQL-Composer
[![Build Status](https://travis-ci.org/kidunot89/wp-graphql-composer.svg?branch=develop)](https://travis-ci.org/kidunot89/wp-graphql-composer)
[![Coverage Status](https://coveralls.io/repos/github/kidunot89/wp-graphql-composer/badge.svg?branch=develop)](https://coveralls.io/github/kidunot89/wp-graphql-composer?branch=develop)

WP-GraphQL Composer is a library of [React-Apollo](https://www.apollographql.com/docs/react/) components for creating [React](https://reactjs.org) apps served by a WordPress site.

This library was created to be an extension of the [WPGraphQL](https://wpgraphql.com/) plugin, and components and their respective queries won't work without a [GraphQL](https://graphql.org/) server serving a schema identical to the one created by the plugin. I'd recommend using it because no other GraphQL server for WordPress has been developed and tested to the extent of WPGraphQL *to my knowledge*.

## The Goal
This component library is meant to serve a different purpose than most component libraries. The focus of the library is the minimize the logic workload of creating a React-Apollo app from a [WPGraphQL](https://wpgraphql.com/)-served endpoint. This is made possible by stitching together state/logic management components and view component using the [Recompose](https://github.com/acdlite/recompose) library. Each component can be customized heavily using there `.compose()` function. View the **[Creating New Composers](#creating-new-composers)** for more detail. If you view any of the following examples you'll notice the components have minimal styling. The components are designed to be used as boilerplates.

## Getting Started
Run the command `npm install recompose wp-graphql-composer` in a the project directory of the Apollo-React app directory.
Import `HttpLink` from `apollo-link-http` and `WPProvider` from `wp-graphql-composer` and wrap you root component in a `WPProvider` component. `WPProvider` is a wrapper component for `ApolloProvider`. It handles authentication middleware and reads JWT user tokens from HTML5 localStorage.
```
  import React from "react";
  import ReactDOM from "react-dom";
  import { HttpLink } from "apollo-link-http";
  import { Menu, WPProvider } from "wp-graphql-composer";

  // Create Link
  const httpLink = new HttpLink({ uri: '/graphql', credentials: 'same-origin' })

  // Note link prop
  ReactDOM.render(
    <WPProvider link={httpLink}>
      <div className="theme">
        <Header>
          <Menu location="PRIMARY" />
          <Login />
        </Header>
        <Main />
      </div>
    </WPProvider>
  );
```

## Composing Custom Components
The following guide is a simple example of creating a custom `Menu` component with the menu composer. 
1. Start by importing `menu`, `menuItem`, and `subItem` view components from `wp-graphql-composer`, as well as `isEmpty` and `map` from `lodash`.
```
...
import { menu, menuItem, subItem } from 'wp-graphql-composer';
import { isEmpty, map } from 'lodash';
```
2. Next create new components to be the new view layers for the menu, menu item, and sub menu components. It's not required that all three components recomposed, but it is being done in the example for reference. 
```
  const subMenuView = ( { MenuItem, items } ) => (
    <ul className="sub-menu">
      { _.map( items, ( { id, url, label,  } ) => (
        <li key={ id }>
          <a href={ url }>{ label }</a>
        </li>
      ) ) }
    </ul>
  );

  const menuItemView = ( { url, label, items, SubMenu, } ) => (
    <React.Fragment>
      <a className="menu-item" href={ url }>{ label }</a>
      { !_.isEmpty( items ) && <SubMenu items={ items } /> }
    </React.Fragment>
  );

  const customMenuView = ( { items, MenuItem, SubMenu } ) => (
    <nav className="menu">
      { _.map( items, ( { id, ...r } ) => (
        <div key={ id } className="menu-item">
          <MenuItem { ...r } />
        </div>
      ) ) }
    </nav>
  );
```
3. Last use the `composer` assigned to `compose` on each of the imported view components to compose a new `CustomMenu` Component.
```
  const SubMenu = subMenu.compose({ view: subMenuView });
  const MenuItem = menuItem.compose({ view: menuItemView });
  const CustomMenu = menu.compose({
    view: customMenuView,
    MenuItem,
    SubMenu
  });

  ReactDOM.render(
    <WPProvider {...}>
      <CustomMenu location="SOCIAL" />
    </WPProvider>
  );
```
The following view components have a `composer`.
- **archives**
- **header**
- **main**
- **menu**
- **menuItem**
- **attachment**
- **page**
- **post**
- **login**
- **userControls**
- **error**
- **loading**

And customizing them is generally the same with a few key differences in the logic/state handling layers. Read more about the `composers` below.

## What is a Composer?
A Composer is component *factory* made up of higher-order component stitched together with **[compose](https://github.com/acdlite/recompose/blob/master/docs/API.md#compose)** from the **[Recompose](https://github.com/acdlite/recompose)** library.

### How does it work?
```
  // attachment.jsx
  ...
  /**
   * Internal dependencies
   */
  import { Error, Loading } from '../utils'; 
  import { queryComposer } from '../composers';
  import { CUSTOM_LOGO_QUERY, ATTACHMENT_QUERY } from './query';
  import { customLogoMapper, attachmentMapper } from './attachment-mapper';

  ...

  attachment.compose = queryComposer({
    view: attachment, 
    whileLoading: { view: Loading },
    forError: { view: Error, type: '404-image' },
    queries: [
      {
        query: CUSTOM_LOGO_QUERY,
        cond: ({ customLogo }) => !!customLogo,
        mapper: customLogoMapper,
      },
      {
        query: ATTACHMENT_QUERY,
        cond: ({ customLogo }) => !customLogo,
        mapper: attachmentMapper,
        config: {
          options: ({ id, mediaItemId, slug, uri }) => ({ id, mediaItemId, slug, uri }),
          skip: ({ id, mediaItemId, slug, uri }) => !id && !mediaItemId && !slug && !uri
        }
      },
    ],
  });

  const Attachment = attachment.compose();

  export { attachment, Attachment };
```

The above snippet is the definition for the [Attachment](#attachment) composer.

The first thing you should notice is the `queryComposer` function.
```
  attachment.compose = queryComposer({ ... });
```
`queryComposer` is one of two functions provided for creating composers. The other is `baseComposer` which is almost identical to `queryComposer` except is doesn't have a `queries` property. The both accept an object as the parameter. The use cases are simple. Use `queryComposer` when you need Apollo/GraphQL logic, otherwise use `baseComposer`. The `Error` and `Loading` composers are created using `baseComposer`.

The next is the first three properties of the options object.
```
  view: attachment, 
  whileLoading: { view: Loading },
  forError: { view: Error, type: '404-image' },
```
`view`, `whileLoading`, and `forError`. These properties define **loading**, **error**, and **view** layers of the factory.
- **view** *Component* - view layer component rendered after all other layers have been processed and component has left the loading state and no errors have been thrown.
- **whileLoading** *object* - the first Higher-Order-Component called in composers created by the `baseComposer` and second after `queries` in the `queryComposer`. It renders an alternative component base upon a conditional statement. Its takes an object with two properties as the parameter.
  - **view** *Component* - component rendered when `cond` returns *truthy* value.
  - **cond** *function* *optional - conditional to determine if component is in a loading state or not. Component `props` object is provided as a parameter. It defaults to `props => !!props.data.loading`.
- **forError** *object* - Higher-Order-Component called after `whileLoading`. It handles errors thrown in the **query** layer HOC before its called and catches any error thrown in the layers called after it. And like `whileLoading` it takes an object with properties as the parameter.
  - **view** *Component* - component rendered when error thrown.
  - **cond** *function* *optional - conditional to determine if error was flagged in layer called before the error layer. Component `props` object is provided as a parameter. It defaults to `props => (!!props[errorProp] || !!props.error)`.
  - **errorProp** *string* *optional - path to prop used as `errorProp` in `cond`. Defaults to `data.error.message`.
  - **type** *string** *optional - error type flagged when `cond` returns *truthy* value.

The last key thing to note is the `queries` property. 
```
  queries: [
    {
      query: CUSTOM_LOGO_QUERY,
      cond: ({ customLogo }) => !!customLogo,
      mapper: customLogoMapper,
    },
    {
      query: ATTACHMENT_QUERY,
      cond: ({ customLogo }) => !customLogo,
      mapper: attachmentMapper,
      config: {
        options: ({ id, mediaItemId, slug, uri }) => ({ id, mediaItemId, slug, uri }),
        skip: ({ id, mediaItemId, slug, uri }) => !id && !mediaItemId && !slug && !uri
      }
    },
  ],
```
This is one of two properties unique to the `queryComposer` and it's the most complex. 
- **queries** *array* array of query configurations to be used by the resulting component. The configurations take for properies.
  - **query** *gql* - query to be requested
  - **cond** *function* *optional - conditional function to determine if `query` should be used based upon prop provided. Ex. `props => !!props.id`.
  - **config** *object* *optional - configuration use by **Apollo**'s [graphql](https://www.apollographql.com/docs/react/api/react-apollo.html#graphql) higher-order component
  - **mapper** *function* *optional - props mapper function called after query is successful and loading state has been passed.

Also, take in account that the first configuration with a `cond` that returns true is the configurations used.

There are a few more properties, you can find out more about in the next section. Try a remember the composers layer hierachy shown below and everything should work out.

```
// QueryComposer
...queries(loading(error(queryMapper(...defaultExtraHocs(...extraHocs(sharedMapper(view)))))))

// BaseComposer
loading(error(...defaultExtraHocs(...extraHocs(mapper(view)))))
```

## Composers
`baseComposer` - composers created from the function create a composer wrapped in an loading state higher-order-component, error handling higher-order-component, and a props mapper.

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
### WPProvider
Handles setting up an `ApolloProvider` and authenication middleware for using **[WPGraphQL JWT Authentication](https://github.com/wp-graphql/wp-graphql-jwt-authentication)**

#### Props
- **link** *Apollo HttpLink* HttpLink object used designating the GraphQL server information
- **fragmentData** *object/shape* - GraphQL server information used to describe query info. See more [below](#introspection-cli).

#### Example
```
  import React from react;
  import ReactDOM from 'react-dom';
  import { HttpLink } from 'apollo-link-http';
  import { WPProvider } from 'wp-graphql-composer';

  const httpLink = new HttpLink({
      uri: endpoint,
      credentials: 'same-origin',
  });

  ReactDOM.render (
    <WPProvider link={ httpLink }>
      { children }
    </WPProvider>
  );
```

### Main
Handles routing by querying for WordPress reading and permalink setting and passing it on to a routing function that process the data and returns a Routing Component that is provided to the view component as prop named `Routes`. The routing function can be substituted for a custom Routing setup. 

#### Notes
The default routing function is designed to mimics WordPress' default pretty permalink and has two key requirements.
- Pretty permalinks must be enabled on the WordPress site serving the WPGraphQL server.
- `react-router-dom` package be installed and *Main* is wrapped in a `BrowserRouter`, `HashRouter` or the like.

#### WPRouting Component props
- **archive** *Component* component for handling WP Archive routes including `tag` and `category` paths
- **page** *Component* component for handling WP Page routes
- **post** *Component* component for handling WP Post routes
- **frontChildren** *any* for inserting extra routes at the start of `react-router-dom` **Switch** component.
- **children** *any* for inserting extra routes before the catch-all route of `react-router-dom` **Switch** component.

#### Custom view component example using Routes
```
  import React from 'react';
  import { main } from 'wp-graphql-composer';

  const view = ({ Archive, Page, Post, Routes, ...rest }) => {
    return (
      <main className="main" {...rest}>
        <Routes archive={Archive} page={Page} post={Post}>
          <Route exact path="/books/:id" component={Book} />
        <Routes>
      </main>
    );
  };

  const Main = main.compose({ view });
```

### Attachment
Renders images stored in the WP media library 

#### Props

#### Notes
- `CUSTOM_LOGO_QUERY` unusable until WPGraphQL PR#571 merged*

### Page
Renders component using WP Page data

#### Notes
- Schema patch needed for use. Read more [below](#schema-patch).

### Post
Renders component using WP Post data

#### Notes
- Schema patch needed for use. Read more [below](#schema-patch).

### Archives
Queries a list of WP Posts based on props provided.

#### Props
- **where** *object/shape* filter parameters
  - **category** *string* post category
  - **tag** *string* post tag
  - **year** *integer* year post created
  - **month** *integer* month post created
  - **author** *string* post author
  - **search** *string* post search
- **first** *integer* post count limit

#### Notes
- Schema patch needed. Read more [below](#schema-patch).

### Header
Renders Site Info(Title and Description)

### Menu
Renders component using WP Menu data

### Login
Handles user login using `login` mutation provided by the [WPGraphQL-JWT-Authenication]() plugin and the authenication middleware managed by the `WPProvider` component. This means that in order for this component to work the **WPGraphQL-JWT-Authenication** must be installed and activated on the WordPress site behind the GraphQL endpoint.

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
By default some WP settings aren't exposed by WPGraphQL. This is due to the fact that these settings aren't loaded using WordPress's Option API. While there have been talks of patching these settings in WPGraphQL nothing has been done as of yet. To get around this issue the settings can be added to the WPGraphQL schema manually. Below is an example that you can copy and patch into your theme's `functions.php` or plugin's `[plugin-name].php`. These are also the settings needed by a couple of the components in the library.
```
use GraphQLRelay\Relay;
use \WPGraphQL\Data\DataSource;

function wp_graphql_schema_patch() {
  register_graphql_fields( 'Settings', [
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

## Introspection CLI
This scripts fetches schema fragment data for use with WPProvider to silent `heuristic fragment` warnings.

### Setup
Before using the script you have to install two dependencies. Run the following
`npm install --save-dev chalk node-fetch`.

### Usage
Run the script using `wpg-intro <endpoint> <output>`. `<endpoint>` is the WPGraphQL endpoint being used by the app and it's required. `<output>` is the path the output json file should be saved to, it defaults to the project working directory root.

### Example
To use introspection data with the `WPProvider` component, import introspection json file as a module and set it to `WPProvider` as the `fragmentData` prop.
```
...
import { WPProvider } from 'wp-graphql-composer';
import json from './path/to/fragment/file';

...

ReactDOM.render(
  (
    <WPProvider link={httpLink} fragmentData={json}>
      ...
    </WPProvider>
  ),
  document.getElementById('root'),
);
```

