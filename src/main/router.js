import React, { createFactory } from 'react';
import { get } from 'lodash';
import { setDisplayName, wrapDisplayName } from 'recompose';
import { Switch, Route } from 'react-router-dom';

export const mapLoopProps = ({ data, ...rest }) => {
  const pageForPostsSlug = get(data, 'allSettings.pageForPosts');
  const pageOnFront = get(data, 'allSettings.pageOnFront');
  const structure = get(data, 'allSettings.permalinkStructure');
  const limit = get(data, 'allSettings.readingSettingsPostsPerPage');
  
  return { pageForPostsSlug, pageOnFront, structure, limit,...rest };
};

export const defaultRoutes = 
({ limit, pageOnFront, postsPath, pageForPostsSlug }) => 
  ({ Archive, Page, Post, frontChildren, children, ...rest }) => (
    <Switch {...rest}>
      {/* Extra Routes */}
      {frontChildren}

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
        path={`/category/:category`}
        render={({ match: { params } }) => (
          <Archive first={limit} where={params} />
        )}
      />
      
      {/* Archive by tag */}
      <Route
        path={`/tag/:tag`}
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
      {children}

      {/* Page */}
      <Route
        path={`/(.*)`}
        render={({ match: { params } }) => (<Page uri={params[0]} />)}
      />
    </Switch>
  );

export const routesProcessor = (routesView) => (BaseComponent) => {
  const BaseFactory = createFactory(BaseComponent);

  const RoutesProcessor = ({
    pageForPostsSlug, pageOnFront, structure, limit,
    Archive, Post, Page, ...rest
  }) => {
    if (!structure) {
      throw new Error('Pretty permalinks must be on');
    }

    // Format post-type path from permalink structure
    const postsPath = structure.replace(/%([A-z]+)%/g, ':$1')
    .replace(/:(monthnum|day|hour|minute|second)/g, ':$1(\\d{2})')
    .replace(/:(post_id)/g, ':$1(\\d{3})')
    .replace(/:(year)/g, ':$1(\\d{4})');

    const Routes = routesView({limit, pageOnFront, postsPath, pageForPostsSlug});
    
    return BaseFactory({
      Routes,
      ...rest
    });
  }

  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(BaseComponent, 'routesProcessor'))(RoutesProcessor)
  }

  return RoutesProcessor;
}