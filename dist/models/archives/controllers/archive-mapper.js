function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import { find, get } from 'lodash';

var monthNames = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

var thisYear = new Date().getFullYear();

function jsUcfirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Return archive header based on query variables
 * @param {object} where  
 * @param {number} resultCount 
 */
var getHeader = function getHeader(_ref, results) {
  var category = _ref.category,
      tag = _ref.tag,
      month = _ref.month,
      year = _ref.year,
      author = _ref.author,
      search = _ref.search;

  switch (true) {
    case results.length === 0:
      return 'No posts found';

    case !!category:
      return 'Posts categorized in ' + category;

    case !!tag:
      return 'Posts tagged in ' + jsUcfirst(tag);

    case !!year && !!month:
      return 'Posts made ' + monthNames[month] + ' ' + year;

    case !!year:
      return thisYear === year ? 'Posts made this year' : thisYear - 1 === year ? 'Posts made last year' : 'Posts made in ' + year;

    case !!author:
      return 'Posts made by ' + author;

    case !!search:
      return 'Searching ' + search;

    default:
      return 'Recent Posts';
  }
};

var archiveMapper = function archiveMapper(_ref2) {
  var data = _ref2.data,
      rest = _objectWithoutProperties(_ref2, ['data']);

  var resultsData = get(data, 'posts.nodes');
  console.log(data);
  var header = getHeader(data.variables, resultsData);

  return Object.assign({ header: header, resultsData: resultsData }, rest);
};
export { archiveMapper };