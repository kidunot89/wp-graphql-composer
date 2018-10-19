function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import { get, map, find } from 'lodash';

var monthNames = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

var thisYear = new Date().getFullYear();

var getTermName = function getTermName(term_slug, results) {
  var taxonomy = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'tags';

  var allTerms = get(results, '[0].meta.' + taxonomy);
  var term = find(allTerms, function (_ref) {
    var slug = _ref.slug;
    return slug === term_slug;
  });
  return term.name;
};

/**
 * Return archive header based on query variables
 * @param {object} where  
 * @param {number} resultCount 
 */
var getHeader = function getHeader(_ref2, results) {
  var category = _ref2.category,
      tag = _ref2.tag,
      day = _ref2.day,
      month = _ref2.month,
      year = _ref2.year,
      author = _ref2.author,
      search = _ref2.search;

  switch (true) {
    case results.length === 0:
      return 'No posts found';

    case !!category:
      return 'Posts categorized in ' + getTermName(category, results, 'categories');

    case !!tag:
      return 'Posts tagged in ' + getTermName(tag, results);

    case !!year && !!month && !!day:
      return 'Posts made ' + monthNames[month] + ' ' + day + ', ' + year;

    case !!year && !!month:
      return 'Posts made ' + monthNames[month] + ' ' + year;

    case !!year:
      return thisYear === year ? 'Posts made this year' : thisYear - 1 === year ? 'Posts made last year' : 'Posts made in ' + year;

    case !!author:
      return 'Posts made by ' + author;

    case !!search:
      return 'Searching "' + search + '"';

    default:
      return 'Recent Posts';
  }
};

var archiveMapper = function archiveMapper(_ref3) {
  var data = _ref3.data,
      first = _ref3.first,
      rest = _objectWithoutProperties(_ref3, ['data', 'first']);

  var rawResults = get(data, 'posts.nodes');
  var resultsData = map(rawResults, function (_ref4) {
    var author = _ref4.author,
        categories = _ref4.categories,
        tags = _ref4.tags,
        date = _ref4.date,
        modified = _ref4.modified,
        __typename = _ref4.__typename,
        rest = _objectWithoutProperties(_ref4, ['author', 'categories', 'tags', 'date', 'modified', '__typename']);

    return Object.assign({}, rest, {
      meta: {
        author: author,
        categories: get(categories, 'nodes'),
        tags: get(tags, 'nodes'),
        date: date,
        modified: modified
      }
    });
  });
  var header = getHeader(data.variables, resultsData);

  return Object.assign({ header: header, resultsData: resultsData }, rest);
};
export { archiveMapper };