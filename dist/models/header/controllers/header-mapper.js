function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import { get } from 'lodash';

export default (function (_ref) {
  var data = _ref.data,
      rest = _objectWithoutProperties(_ref, ['data']);

  var title = get(data, 'allSettings.generalSettingsTitle');
  var description = get(data, 'allSettings.generalSettingsDescription');
  var url = get(data, 'allSettings.homeUrl');
  var logo = get(data, 'themeMods.customLogo');

  return Object.assign({ title: title, url: url, description: description, logo: logo }, rest);
});