import React from 'react';
import { get, omit } from 'lodash';
import { setDisplayName, wrapDisplayName } from 'recompose';

export const pageStateManager = (BaseComponent) => {
  const BaseFactory = React.createFactory(BaseComponent);

  class PageStateManager extends React.Component {
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

  class PostStateManager extends React.Component {
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
      const featured = get(post, 'featuredImage.id');
      const details = {
        author: get(post, 'author'),
        categories: get(post, 'categories.nodes'),
        date: get(post, 'date'),
        modified: get(post, 'modified'),
        tags: get(post, 'tags.nodes'),
      }

      const newProps = {
        details,
        featured,
        ...omit(post, [
          'author',
          'categories',
          'featuredImage',
          'tags',
          'date',
          'modified',
        ]),
        ...rest
      };

      return BaseFactory(newProps);
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(BaseComponent, 'postStateManager'))(PostStateManager)
  }

  return PostStateManager;
}