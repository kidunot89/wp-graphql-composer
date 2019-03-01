// wp-routing.js
/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

/**
 * Renders routes using react-router-dom to mimic WordPress routing.
 * 
 * @return { React.Component }
 */
const wpRoutes = ({
  limit,
  pageOnFront,
  structure,
  pageForPostsSlug,
  categoryBase,
  tagBase
}) => 
  ({
    archive: Archive,
    page: Page,
    post: Post,
    frontChildren,
    children,
    ...rest
  }) => {
    // Formats path-to-regex expression from permalink structure
    if (!structure) {
      throw new Error('Pretty permalinks must be on');
    }
    
    const postsPath = structure.replace(/%([A-z]+)%/g, ':$1')
      .replace(/:(monthnum|day|hour|minute|second)/g, ':$1(\\d{2})')
      .replace(/:(post_id)/g, ':$1(\\d{3})')
      .replace(/:(year)/g, ':$1(\\d{4})');

    return (
      <Switch {...rest}>
        {/* Extra Routes */}
        { frontChildren }

        {/* Home */}
        <Route exact path={`/`} render={() => {
          if (pageOnFront) {
            return (<Page id={pageOnFront} />);
          }
          return (<Archive first={limit} noHeader showContent />)
        }} />
        
        {/* Archive by year */}
        <Route
          exact
          path={`/:year(\\d{4})`}
          render={({ match: { params } }) => {
            const year = parseInt(params.year, 10);

            return (
              <Archive first={limit} where={{ year }} />
            );
          }}
        />
        {/* Archive by month */}
        <Route
          exact
          path={`/:year(\\d{4})/:monthnum(\\d{2})/:day(\\d{2})`}
          render={({ match: { params } }) => {
            const day = parseInt(params.day, 10);
            const year = parseInt(params.year, 10);
            const month = parseInt(params.monthnum, 10);
            
            return (
              <Archive first={limit} where={{ month, year, day }} />
            );
          }}
        />
        {/* Archive by month */}
        <Route
          exact
          path={`/:year(\\d{4})/:monthnum(\\d{2})`}
          render={({ match: { params } }) => {
            const year = parseInt(params.year, 10);
            const month = parseInt(params.monthnum, 10);
            
            return (
              <Archive first={limit} where={{ month, year }} />
            );
          }}
        />
        
        {/* Archive by category */}
        <Route
          path={`/${categoryBase && categoryBase !== '' ? categoryBase : 'category'}/:category`}
          render={({ match: { params } }) => (
            <Archive first={limit} where={params} />
          )}
        />
        
        {/* Archive by tag */}
        <Route
          path={`/${tagBase && tagBase !== '' ? tagBase : 'tag'}/:tag`}
          render={({ match: { params } }) => (
            <Archive first={limit} where={params} />
          )} 
        />
        
        {/* Archive by author */}
        <Route
          path={`/author/:author`}
          render={({ match: { params } }) => (
            <Archive first={limit} where={params} />
          )}
        />
        
        {/* Archive by search */}
        <Route
          path={`/search/:search`}
          render={({ match: { params } }) => {
            return (
              <Archive first={limit} where={params} />
            )
        }}
        />
        
        {/* Page for posts */}
        {pageForPostsSlug & (
          <Route
            exact
            path={`/${pageForPostsSlug}`}
            render={() => (
              <Archive first={limit} />
            )} 
          />
        )}
        
        {/* Post */}
        <Route
          exact
          path={postsPath}
          render={({ match: { params } }) => {
            const { post_id, postname } = params;
            if (post_id) return (<Post postId={post_id} />);
            if (postname) return (<Post slug={postname} />);
            else throw new Error('Post not found');
          }}
        />

        {/* Extra Routes */}
        { children }

        {/* Page */}
        <Route
          path={`/(.*)`}
          render={({ match: { params } }) => (<Page uri={params[0]} />)}
        />
      </Switch>
    );
  };

wpRoutes.propTypes = {
  limit: PropTypes.number,
  pageOnFront: PropTypes.string,
  structure: PropTypes.string.isRequired,
  pageForPostsSlug: PropTypes.string,
  categoryBase: PropTypes.string,
  tagBase: PropTypes.string,
};

wpRoutes.defaultProps = {
  limit: 10,
  pageOnFront: undefined,
  pageForPostsSlug: undefined,
  categoryBase: undefined,
  tagBase: undefined,
};

export default wpRoutes;