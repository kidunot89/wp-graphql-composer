import _taggedTemplateLiteral from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral";

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  query LoopQuery {\n    allSettings {\n      pageForPosts\n      pageOnFront\n      permalinkStructure\n      readingSettingsPostsPerPage\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

import { gql } from 'apollo-boost';
export var LOOP_QUERY = gql(_templateObject());