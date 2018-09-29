function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import { get } from 'lodash';
import { compose, mapProps } from 'recompose';
import { graphql } from 'react-apollo';
import { whileLoading, forError, Error, Loading } from 'lib';

import header from './views/header';
import { HEADER_QUERY } from './query';

header.compose = function () {
  var template = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : header;
  var loading = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Loading;
  var error = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Error;
  return compose(graphql(HEADER_QUERY), whileLoading(loading), forError(error, 'query'), mapProps(function (_ref) {
    var data = _ref.data,
        rest = _objectWithoutProperties(_ref, ['data']);

    var title = get(data, 'allSettings.generalSettingsTitle');
    var description = get(data, 'allSettings.generalSettingsDescription');
    var url = get(data, 'allSettings.homeUrl');
    var logo = get(data, 'themeMods.customLogo');

    return Object.assign({
      title: title, url: url, description: description, logo: logo
    }, rest);
  }))(template);
};

var Header = header.compose();

export { Header, header, HEADER_QUERY };