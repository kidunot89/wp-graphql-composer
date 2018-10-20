import _objectSpread from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/objectSpread";
import _objectWithoutProperties from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties";
import { get } from 'lodash';
export default (function (_ref) {
  var data = _ref.data,
      rest = _objectWithoutProperties(_ref, ["data"]);

  var title = get(data, 'allSettings.generalSettingsTitle');
  var description = get(data, 'allSettings.generalSettingsDescription');
  var url = get(data, 'allSettings.homeUrl');
  var logo = get(data, 'themeMods.customLogo');
  return _objectSpread({
    title: title,
    url: url,
    description: description,
    logo: logo
  }, rest);
});