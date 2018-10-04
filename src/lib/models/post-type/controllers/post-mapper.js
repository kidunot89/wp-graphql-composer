import { get, omit } from 'lodash';

export default ({ data, ...rest }) => {
  const post = get(data, 'post') || get(data, 'postBy');
  const featured = get(post, 'featuredImage.id');
  const details = {
    author: get(post, 'author'),
    categories: get(post, 'tags.categories'),
    date: get(post, 'date'),
    modified: get(post, 'modified'),
    tags: get(post, 'tags.nodes'),
  }

  return {
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
};