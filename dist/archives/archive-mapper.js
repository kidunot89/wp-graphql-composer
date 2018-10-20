import _objectSpread from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/objectSpread";
import _objectWithoutProperties from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties";
import { get, map, find } from 'lodash';
var monthNames = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var thisYear = new Date().getFullYear();

var getTermName = function getTermName(term_slug, results) {
  var taxonomy = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'tags';
  var allTerms = get(results, "[0].meta.".concat(taxonomy));
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
      return "Posts categorized in ".concat(getTermName(category, results, 'categories'));

    case !!tag:
      return "Posts tagged in ".concat(getTermName(tag, results));

    case !!year && !!month && !!day:
      return "Posts made ".concat(monthNames[month], " ").concat(day, ", ").concat(year);

    case !!year && !!month:
      return "Posts made ".concat(monthNames[month], " ").concat(year);

    case !!year:
      return thisYear === year ? 'Posts made this year' : thisYear - 1 === year ? 'Posts made last year' : "Posts made in ".concat(year);

    case !!author:
      return "Posts made by ".concat(author);

    case !!search:
      return "Searching \"".concat(search, "\"");

    default:
      return 'Recent Posts';
  }
};

export var archiveMapper = function archiveMapper(_ref3) {
  var data = _ref3.data,
      first = _ref3.first,
      rest = _objectWithoutProperties(_ref3, ["data", "first"]);

  var rawResults = get(data, 'posts.nodes');
  var resultsData = map(rawResults, function (_ref4) {
    var author = _ref4.author,
        categories = _ref4.categories,
        tags = _ref4.tags,
        date = _ref4.date,
        modified = _ref4.modified,
        __typename = _ref4.__typename,
        rest = _objectWithoutProperties(_ref4, ["author", "categories", "tags", "date", "modified", "__typename"]);

    return _objectSpread({}, rest, {
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
  return _objectSpread({
    header: header,
    resultsData: resultsData
  }, rest);
};