var _templateObject = _taggedTemplateLiteral(['\n  query HeaderQuery {\n    allSettings {\n      generalSettingsTitle\n      generalSettingsDescription\n      homeUrl\n    }\n\n    themeMods {\n      customLogo\n    }\n  }\n'], ['\n  query HeaderQuery {\n    allSettings {\n      generalSettingsTitle\n      generalSettingsDescription\n      homeUrl\n    }\n\n    themeMods {\n      customLogo\n    }\n  }\n']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import { gql } from 'apollo-boost';

export var HEADER_QUERY = gql(_templateObject);