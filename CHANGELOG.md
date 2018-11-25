#Changelog

## [0.2.0] Breaking Change
### Changes
- **Create-React-App ejected** to solves some styling issues as well as for optimization purposes the CRA has been ejected and all dependencies directly related to react-scripts have been removed.
- **Unit Tests** they now run against the `dist/` instead of the `src`
### Fixed
- **Unit Tests** unit test were broken somewhere between 

### Removed
- **`wp-graphql-compose`** see [0.1.10]:Deprecated

## [0.1.10]
### Deprecated
- **`wp-graphql-compose`** code related to the command line interface `wp-graphql-compose` is official deprecated and its recommend that you use [Oil-Based Boilerplate](https://github.com/kidunot89/oil-based-boilerplate) instead. `wp-graphql-compose` CLI will be remove in 0.2.x

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
