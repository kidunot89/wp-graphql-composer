var _templateObject = _taggedTemplateLiteral(['\n  query LoopQuery {\n    allSettings {\n      pageForPosts{\n        id\n        slug\n      }\n      pageOnFront\n      permalinkStructure\n      readingSettingsPostsPerPage\n    }\n  }\n'], ['\n  query LoopQuery {\n    allSettings {\n      pageForPosts{\n        id\n        slug\n      }\n      pageOnFront\n      permalinkStructure\n      readingSettingsPostsPerPage\n    }\n  }\n']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import { gql } from 'apollo-boost';

export var LOOP_QUERY = gql(_templateObject);