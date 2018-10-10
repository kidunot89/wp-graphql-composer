function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/**
 * Page props mapper
 */
export default (function (_ref) {
  var _ref$data = _ref.data,
      page = _ref$data.page,
      pageBy = _ref$data.pageBy,
      rest = _objectWithoutProperties(_ref, ["data"]);

  return Object.assign({}, page, pageBy, rest);
});