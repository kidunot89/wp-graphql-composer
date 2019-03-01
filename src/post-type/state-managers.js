// state-managers.js
/**
 * External dependencies
 */
import React from 'react';
import { get } from 'lodash';
import { setDisplayName, wrapDisplayName } from 'recompose';

/**
 * Internal dependencies 
 */
import { postPropsMapper } from './mappers';

export const pageStateManager = (BaseComponent) => {
  const BaseFactory = React.createFactory(BaseComponent);

  class PageStateManager extends React.PureComponent {
    componentDidUpdate(prevProps) {
      const { id, pageId, uri } = this.props;
      if(
        prevProps.id !== id ||
        prevProps.pageId !== pageId ||
        prevProps.uri !== uri
      ) {
        this.props.data.refetch();
      }
    }

    render() {
      const { data: { page, pageBy }, ...rest } = this.props;

      const newProps = { ...page, ...pageBy, ...rest };

      return BaseFactory(newProps);
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(BaseComponent, 'pageStateManager'))(PageStateManager)
  }

  return PageStateManager;
}

export const postStateManager = (BaseComponent) => {
  const BaseFactory = React.createFactory(BaseComponent);

  class PostStateManager extends React.PureComponent {
    componentDidUpdate(prevProps) {
      const { id, pageId, uri, slug } = this.props;
      if(
        prevProps.id !== id ||
        prevProps.pageId !== pageId ||
        prevProps.uri !== uri ||
        prevProps.slug !== slug
      ) {
        this.props.data.refetch();
      }
    }

    render() {
      const { data, ...rest } = this.props;
      const post = get(data, 'post') || get(data, 'postBy');

      return BaseFactory({...postPropsMapper(post), ...rest});
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(BaseComponent, 'postStateManager'))(PostStateManager)
  }

  return PostStateManager;
}