# Changelog
## [0.3.2]
### Changes
- **Main** default routing function renamed and moved to `wpRouting` and moved to [./src/main/wp-routing.js](https://github.com/kidunot89/wp-graphql-composer/blob/develop/src/main/wp-routing.js).
- **routeProcessor** renamed to `router`.
- **README.md** updated.
- **WPProvider** refactored.

### Fixes
- **Jest runs against distribution instead of source code** see more [here](https://github.com/kidunot89/wp-graphql-composer/issues/18)
- **Hard-coded meta data in Archive and Main tests** see more [here](https://github.com/kidunot89/wp-graphql-composer/issues/17)
- **Move certain packages to peerDependencies & devDependencies** see more [here](https://github.com/kidunot89/wp-graphql-composer/issues/16)

## [0.3.1] Breaking Change
### Added
- **Introspectation CLI** use `wpg-intro <endpoint> <output>` to run execute an introspection query against `<endpoint>`, and a json file will be save at `<output>` which defaults to the project working directory root.

### Changes
- **Package.json updated** `scripts` and `files` files added for dependency optimization and new feature. See added above. 

### Removed
- **PostComments** removed due several design flawed. Deprecation stage was skipped on account that the component was broken.

## [0.3.0] - skipped due to issue with git history

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
- **wp-graphql-compose CLI ** code related to the command line interface `wp-graphql-compose` is official deprecated and its recommend that you use [Oil-Based Boilerplate](https://github.com/kidunot89/oil-based-boilerplate) instead. `wp-graphql-compose` CLI will be remove in 0.2.x

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
