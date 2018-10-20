import _taggedTemplateLiteral from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral";

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  query HeaderQuery {\n    allSettings {\n      generalSettingsTitle\n      generalSettingsDescription\n      homeUrl\n    }\n\n    themeMods {\n      customLogo\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

import { gql } from 'apollo-boost';
export var HEADER_QUERY = gql(_templateObject());