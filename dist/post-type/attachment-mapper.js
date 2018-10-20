import _objectSpread from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/objectSpread";
import _objectWithoutProperties from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties";

/**
 * Attachment Props Mapper
 */
import { filter, get, isEmpty, map, omit, sortBy } from 'lodash';
/**
 * Maps image source for srcSet attribute
 * 
 * @param {string} sourceUrl - url to image,
 * @param {string} width - string representation of image width, 
 */

var mapSources = function mapSources(_ref) {
  var sourceUrl = _ref.sourceUrl,
      width = _ref.width;
  return "".concat(sourceUrl, " ").concat(width, "w");
};
/**
 * Maps image source for sizes attribute
 * 
 * @param {string} rawWidth - string representation of image width
 */


var mapBreakpoints = function mapBreakpoints(_ref2) {
  var rawWidth = _ref2.width;
  var width = parseInt(rawWidth, 10);
  if (width > 1200) return "".concat(width, "px");else if (width <= 1200 && width > 992) return "(max-width: 1200px) ".concat(width, "px");else if (width <= 992 && width > 768) return "(max-width: 992px) ".concat(width, "px");else if (width <= 768 && width > 576) return "(max-width: 768px) ".concat(width, "px");else return "(max-width: 576px) ".concat(width, "px");
};
/**
 * Maps alternate images to breakpoints and returns an array of media query strings
 * 
 * @param {array} sizes - data about image sources
 * @returns {array}
 */


var reduceBreakpoints = function reduceBreakpoints(sizes) {
  var breakpoints = map(filter(sizes, function (_ref3) {
    var width = _ref3.width;
    return parseInt(width, 10) >= 576;
  }), mapBreakpoints);
  var reduced = [];
  var sort = /^(?:\(max-width: \d+px\) )?(\d+)px$/;
  var sm = sortBy(filter(breakpoints, function (mediaQuery) {
    return /^\(max-width: 576px\)/.test(mediaQuery);
  }), function (mediaQuery) {
    return parseInt(mediaQuery.match(sort), 10);
  });
  var md = sortBy(filter(breakpoints, function (mediaQuery) {
    return /^\(max-width: 768px\)/.test(mediaQuery);
  }), function (mediaQuery) {
    return parseInt(mediaQuery.match(sort), 10);
  });
  var lg = sortBy(filter(breakpoints, function (mediaQuery) {
    return /^\(max-width: 992px\)/.test(mediaQuery);
  }), function (mediaQuery) {
    return parseInt(mediaQuery.match(sort), 10);
  });
  var xl = sortBy(filter(breakpoints, function (mediaQuery) {
    return /^\(max-width: 1200px\)/.test(mediaQuery);
  }), function (mediaQuery) {
    return parseInt(mediaQuery.match(sort), 10);
  });
  var max = sortBy(filter(breakpoints, function (mediaQuery) {
    return !/^\(max-width:/.test(mediaQuery);
  }), function (mediaQuery) {
    return parseInt(mediaQuery.match(sort), 10);
  });
  if (!isEmpty(sm)) reduced.push(sm[0]);
  if (!isEmpty(md)) reduced.push(md[0]);
  if (!isEmpty(lg)) reduced.push(lg[0]);
  if (!isEmpty(xl)) reduced.push(xl[0]);
  if (!isEmpty(max)) reduced.push(max[0]);
  return reduced;
};

export default (function (_ref4) {
  var data = _ref4.data,
      src = _ref4.src,
      alt = _ref4.alt,
      rest = _objectWithoutProperties(_ref4, ["data", "src", "alt"]);

  var variables = ['id', 'mediaItemId', 'slug', 'uri'];
  var imgSrc = get(data, 'mediaItemBy.sourceUrl') || src;
  var altText = alt || get(data, 'mediaItemBy.altText');
  var sizes = get(data, 'mediaItemBy.mediaDetails.sizes');

  if (sizes && sizes.length > 0) {
    var sources = map(sizes, mapSources);
    var srcSizes = reduceBreakpoints(sizes);
    return _objectSpread({
      src: imgSrc,
      alt: altText,
      srcSet: sources.join(', '),
      sizes: srcSizes.join(', ')
    }, omit(rest, ['fallback'].concat(variables)));
  }

  return _objectSpread({
    src: imgSrc,
    alt: altText
  }, omit(rest, ['fallback'].concat(variables)));
});