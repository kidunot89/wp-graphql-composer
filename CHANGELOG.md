# Changelog

## [Experimental/Incomplete]
### Added
- **Introspectation CLI** use `wpg-intro <endpoint> <output>` to run execute an introspection query against `<endpoint>`, and a json file will be save at `<output>` for use in `WPProvider`. (Incomplete)

## [0.2.2]
### Added
- **Coveralls and Travis-CI** support Travis-CI and code coverage /w Coveralls.io added.

## [0.2.1]
### Added 
- **CUSTOM_LOGO_QUERY** new query add to Attachment default stack. 
Example use with default Attachment stack: `<Attachment customLogo />`.

### Changes
- **Header** `CUSTOM_LOGO_QUERY` now used by Attachment component in default Header view component. 

## [0.2.0] Breaking Change
### Added
- **New build configuration** see changes below

### Changes
- **PWD restructured** `src/lib/` => `src/`
- **Create-React-App ejected** to solves some styling issues as well as for optimization purposes the CRA has been ejected and all dependencies directly related to react-scripts have been removed.
- **Circular dependencies removed** all `/[component-group]/index.js` have modified to be solely exporters all composer definitions are defined in the same file as the view layer for modularity and optimization.
- **Unit Tests** they now run against the `dist/` instead of the `src/`

### Fixed
- **Unit Tests** unit test were broken somewhere between [0.1.5] - [0.1.3]

### Removed
- **`wp-graphql-compose` CLI ** see [0.1.10]:Deprecated
- **`./src/demo`** Incomplete demo replace

## [0.1.10]
### Deprecated
- **`wp-graphql-compose` CLI ** code related to the command line interface `wp-graphql-compose` is official deprecated and its recommend that you use [Oil-Based Boilerplate](https://github.com/kidunot89/oil-based-boilerplate) instead. `wp-graphql-compose` CLI will be remove in 0.2.x

## [0.1.9 and below]
### Added

#### New components 
- **Archive** only post-results created
- **Header** custom schema required until updates made to WP-GraphQL
- **Main**
- **Menu**
- **MenuItem**
- **SubMenu**
- **Attachment** 
- **Page**
- **Post**
- **PostComments**
- **Comment**
- **EditComment**
- **Login**
- **UserControls**
- **Error**
- **Loading**
- **Icon**
- **WPProvider**

#### Tests
- **Archive** only post-results created
- **Header** custom schema required until updates made to WP-GraphQL
- **Main**
- **Menu**
- **Attachment** 
- **Page**
- **Post**
- **PostComments**
- **Login**
- **Error**
- **Loading**
- **Icon**
- **WPProvider**

#### WP-Composer functions
- **baseComposer**
- **composeQuery**
- **errorHandler**
- **forError**
- **queryComposer**
- **utilComposer**
- **whileLoading**

#### `wp-graphql-compose` CLI commands
- `wp-graphql-compose init` - for scaffolding a WordPress theme or plugin stub
- `wp-graphql-compose build` - for adding stub code to build directory
