function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';

var archive = function archive(_ref) {
  var Attachment = _ref.Attachment,
      PostResult = _ref.PostResult,
      container = _ref.container,
      containerProps = _ref.containerProps,
      header = _ref.header,
      noHeader = _ref.noHeader,
      resultsData = _ref.resultsData,
      rest = _objectWithoutProperties(_ref, ['Attachment', 'PostResult', 'container', 'containerProps', 'header', 'noHeader', 'resultsData']);

  var Results = function Results() {
    return React.createElement(
      React.Fragment,
      null,
      !noHeader && React.createElement(
        'header',
        { className: 'page-header' },
        React.createElement(
          'h1',
          { className: 'page-title' },
          header
        )
      ),
      map(resultsData, function (_ref2) {
        var id = _ref2.id,
            r = _objectWithoutProperties(_ref2, ['id']);

        return React.createElement(PostResult, Object.assign({}, r, { id: id, key: id }, Object.assign({}, rest, { Attachment: Attachment })));
      })
    );
  };

  if (container === true) {
    return React.createElement(
      'div',
      containerProps,
      React.createElement(Results, null)
    );
  } else if (container) {
    var Container = container;

    return React.createElement(
      Container,
      containerProps,
      React.createElement(Results, null)
    );
  }

  return React.createElement(Results, null);
};

archive.propTypes = {
  Attachment: PropTypes.func.isRequired,
  PostResult: PropTypes.func.isRequired,
  container: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.func]),
  containerProps: PropTypes.shape({}),
  noHeader: PropTypes.bool,
  header: PropTypes.string,
  resultsData: PropTypes.arrayOf(PropTypes.shape({}))
};

archive.defaultProps = {
  container: undefined,
  containerProps: {},
  noHeader: false,
  header: undefined,
  resultsData: []
};

export default archive;