var _templateObject = _taggedTemplateLiteral(['\n  query AttachmentQuery($mediaItemId: Int) {\n    mediaItemBy(mediaItemId: $mediaItemId){\n      id\n      altText\n      mediaType\n      sourceUrl\n      mediaDetails{\n        sizes {\n          width\n          height\n          sourceUrl\n        }\n      }\n    }\n  }\n'], ['\n  query AttachmentQuery($mediaItemId: Int) {\n    mediaItemBy(mediaItemId: $mediaItemId){\n      id\n      altText\n      mediaType\n      sourceUrl\n      mediaDetails{\n        sizes {\n          width\n          height\n          sourceUrl\n        }\n      }\n    }\n  }\n']);

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import React from 'react';
import _ from 'lodash';
import { compose, mapProps } from 'recompose';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

import { whileLoading, forError, Error, Loading } from 'lib';

/**
 * 
 */
export var ATTACHMENT_QUERY = gql(_templateObject);

/**
 * Maps image source for srcSet attribute
 * 
 * @param {string} sourceUrl - url to image,
 * @param {string} width - string representation of image width, 
 */
var mapSources = function mapSources(_ref) {
  var sourceUrl = _ref.sourceUrl,
      width = _ref.width;
  return sourceUrl + ' ' + width + 'w';
};

/**
 * Maps image source for sizes attribute
 * 
 * @param {string} rawWidth - string representation of image width
 */
var mapBreakpoints = function mapBreakpoints(_ref2) {
  var rawWidth = _ref2.width;

  var width = parseInt(rawWidth);
  if (width > 1200) return width + 'px';else if (width <= 1200 && width > 992) return '(max-width: 1200px) ' + width + 'px';else if (width <= 992 && width > 768) return '(max-width: 992px) ' + width + 'px';else if (width <= 768 && width > 576) return '(max-width: 768px) ' + width + 'px';else return '(max-width: 576px) ' + width + 'px';
};

/**
 * Maps alternate images to breakpoints and returns an array of media query strings
 * 
 * @param {array} sizes - data about image sources
 * @returns {array}
 */
var reduceBreakpoints = function reduceBreakpoints(sizes) {
  var breakpoints = _.map(_.filter(sizes, function (_ref3) {
    var width = _ref3.width;
    return parseInt(width) >= 576;
  }), mapBreakpoints);

  var reduced = [];
  var sort = /^(?:\(max-width: \d+px\) )?(\d+)px$/;
  var sm = _.sortBy(_.filter(breakpoints, function (mediaQuery) {
    return (/^\(max-width: 576px\)/.test(mediaQuery)
    );
  }), function (mediaQuery) {
    return parseInt(mediaQuery.match(sort));
  });
  var md = _.sortBy(_.filter(breakpoints, function (mediaQuery) {
    return (/^\(max-width: 768px\)/.test(mediaQuery)
    );
  }), function (mediaQuery) {
    return parseInt(mediaQuery.match(sort));
  });
  var lg = _.sortBy(_.filter(breakpoints, function (mediaQuery) {
    return (/^\(max-width: 992px\)/.test(mediaQuery)
    );
  }), function (mediaQuery) {
    return parseInt(mediaQuery.match(sort));
  });
  var xl = _.sortBy(_.filter(breakpoints, function (mediaQuery) {
    return (/^\(max-width: 1200px\)/.test(mediaQuery)
    );
  }), function (mediaQuery) {
    return parseInt(mediaQuery.match(sort));
  });
  var max = _.sortBy(_.filter(breakpoints, function (mediaQuery) {
    return !/^\(max-width:/.test(mediaQuery);
  }), function (mediaQuery) {
    return parseInt(mediaQuery.match(sort));
  });

  if (!_.isEmpty(sm)) reduced.push(sm[0]);
  if (!_.isEmpty(md)) reduced.push(md[0]);
  if (!_.isEmpty(lg)) reduced.push(lg[0]);
  if (!_.isEmpty(xl)) reduced.push(xl[0]);
  if (!_.isEmpty(max)) reduced.push(max[0]);

  return reduced;
};

/**
 * Attachment base stateless component
 * 
 * @param {object} props 
 */
var attachment = function attachment(props) {
  return props.src ? React.createElement('img', props) : null;
};

attachment.compose = function () {
  var template = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : attachment;
  var loading = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Loading;
  var error = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Error;
  return compose(graphql(ATTACHMENT_QUERY, {
    options: function options(_ref4) {
      var mediaItemId = _ref4.mediaItemId;
      return { mediaItemId: mediaItemId };
    },
    skip: function skip(_ref5) {
      var mediaItemId = _ref5.mediaItemId;
      return !mediaItemId;
    }
  }), whileLoading(loading), forError(error, '404-image'), mapProps(function (_ref6) {
    var data = _ref6.data,
        src = _ref6.src,
        alt = _ref6.alt,
        rest = _objectWithoutProperties(_ref6, ['data', 'src', 'alt']);

    var imgSrc = _.get(data, 'mediaItemBy.sourceUrl') || src;
    var altText = alt || _.get(data, 'mediaItemBy.altText');

    var sizes = _.get(data, 'mediaItemBy.mediaDetails.sizes');
    if (sizes && sizes.length > 0) {
      var sources = _.map(sizes, mapSources);
      var srcSizes = reduceBreakpoints(sizes);

      return Object.assign({
        src: imgSrc, alt: altText, srcSet: sources.join(', '), sizes: srcSizes.join(', ')
      }, _.omit(rest, ['fallback', 'mediaItemId']));
    }

    return Object.assign({ src: imgSrc, alt: altText }, _.omit(rest, ['fallback', 'mediaItemId']));
  }))(template);
};

export { attachment };

export default attachment.compose();