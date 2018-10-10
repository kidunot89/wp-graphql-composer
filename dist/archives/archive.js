function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';

var archive = function archive(_ref) {
  var className = _ref.className,
      header = _ref.header,
      resultsData = _ref.resultsData,
      PostResult = _ref.postResultView,
      PageResult = _ref.pageResultView,
      rest = _objectWithoutProperties(_ref, ['className', 'header', 'resultsData', 'postResultView', 'pageResultView']);

  return React.createElement(
    'div',
    Object.assign({ className: 'archive ' + className }, rest),
    React.createElement(
      'h2',
      { className: 'archive-header' },
      header
    ),
    map(resultsData, function (_ref2) {
      var id = _ref2.id,
          r = _objectWithoutProperties(_ref2, ['id']);

      return React.createElement(PostResult, Object.assign({}, r, { id: id, key: id }));
    })
  );
};

archive.propTypes = {
  resultsData: PropTypes.arrayOf(PropTypes.shape({})),
  postResultView: PropTypes.func.isRequired,
  pageResultView: PropTypes.func,
  header: PropTypes.string
};

archive.defaultProps = {
  resultsData: [],
  pageResultView: undefined,
  header: undefined
};

export default archive;