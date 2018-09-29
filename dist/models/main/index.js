function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import { compose, mapProps } from 'recompose';
import { graphql } from 'react-apollo';

import { whileLoading, forError, Loading, Error } from 'lib';
import main from './views/main';
import { LOOP_QUERY } from './query';

main.compose = function () {
  var template = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : main;
  var error = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Error;
  var loading = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Loading;
  return compose(graphql(LOOP_QUERY), whileLoading(loading), forError(error), mapProps(function (_ref) {
    var data = _ref.data,
        rest = _objectWithoutProperties(_ref, ['data']);

    return rest;
  }))(template);
};

var Main = main.compose();

export { Main, main, LOOP_QUERY };