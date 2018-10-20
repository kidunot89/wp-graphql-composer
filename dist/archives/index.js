import _objectSpread from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/objectSpread";

/**
 * 
 */
import { queryComposer } from '../composers';
import { Error, Loading } from '../utils';
import { Attachment } from '../post-type';
import { archiveMapper } from './archive-mapper';
import archive from './archive';
import postResult from './post-result';
import { ARCHIVE_QUERY } from './query';
/**
 * Default where args for ARCHIVE_QUERY
 */

var whereArgsDefaults = {
  category: null,
  tag: null,
  year: null,
  month: null,
  day: null,
  author: null,
  search: null
};
archive.compose = queryComposer({
  view: archive,
  PostResult: postResult,
  Attachment: Attachment,
  queries: [{
    query: ARCHIVE_QUERY,
    config: {
      options: function options(_ref) {
        var first = _ref.first,
            where = _ref.where;
        return {
          variables: _objectSpread({
            first: first
          }, whereArgsDefaults, where)
        };
      }
    }
  }],
  whileLoading: {
    view: Loading
  },
  forError: {
    view: Error
  },
  sharedMapper: archiveMapper
});
var Archive = archive.compose({});
export { Archive, archive, ARCHIVE_QUERY };