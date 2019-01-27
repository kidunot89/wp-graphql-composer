import React, { createFactory } from 'react';
import { get } from 'lodash';
import { setDisplayName, wrapDisplayName } from 'recompose';

export const mapLoopProps = ({ data, ...rest }) => {
  const pageForPostsSlug = get(data, 'allSettings.readingSettingsPageForPosts');
  const pageOnFront = get(data, 'allSettings.readingSettingsPageOnFront');
  const structure = get(data, 'allSettings.permalinkSettingsStructure');
  const tagBase = get(data, 'allSettings.permalinkSettingsTagBase');
  const categoryBase = get(data, 'allSettings.permalinkSettingsCategoryBase');
  const limit = get(data, 'allSettings.readingSettingsPostsPerPage');
  
  return {
    pageForPostsSlug,
    pageOnFront,
    structure,
    tagBase,
    categoryBase,
    limit,
    ...rest
  };
};

export const router = (routesView) => (BaseComponent) => {
  const BaseFactory = createFactory(BaseComponent);

  const RoutesProcessor = ({
    pageForPostsSlug,
    pageOnFront,
    structure,
    tagBase,
    categoryBase,
    limit,
    ...rest
  }) => {
    if (!structure) {
      throw new Error('Pretty permalinks must be on');
    }

    const Routes = routesView({
      limit, 
      pageOnFront, 
      structure, 
      tagBase, 
      categoryBase, 
      pageForPostsSlug
    });
    
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