function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import { get, omit } from 'lodash';

export default (function (_ref) {
  var data = _ref.data,
      rest = _objectWithoutProperties(_ref, ['data']);

  var post = get(data, 'post') || get(data, 'postBy');
  var featured = get(post, 'featuredImage.mediaItemId');
  var details = {
    author: get(post, 'author'),
    categories: get(post, 'tags.categories'),
    date: get(post, 'date'),
    modified: get(post, 'modified'),
    tags: get(post, 'tags.nodes')
  };

  return Object.assign({
    details: details,
    featured: featured
  }, omit(post, ['author', 'categories', 'featuredImage', 'tags', 'date', 'modified']), rest);
});