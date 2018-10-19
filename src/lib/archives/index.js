/**
 * 
 */
import { queryComposer } from '../composers';
import { Error, Loading } from '../utils';
import { Attachment } from '../post-type';
import { archiveMapper } from './archive-mapper';
import archive from './archive';
import postResult from './post-result';
import { ARCHIVE_QUERY } from './query'

/**
 * Default where args for ARCHIVE_QUERY
 */
const whereArgsDefaults = {
  category: null,
  tag: null,
  year: null,
  month: null,
  day: null,
  author: null,
  search: null,
};

archive.compose = queryComposer({
  view: archive,
  PostResult: postResult,
  Attachment,
  queries: [{ 
    query: ARCHIVE_QUERY,
    config: {
      options: ({ first, where }) => ({ variables: { first, ...whereArgsDefaults, ...where } })
    }
  }],
  whileLoading: { view: Loading },
  forError: { view: Error },
  sharedMapper: archiveMapper,
});

const Archive = archive.compose({});

export { Archive, archive, ARCHIVE_QUERY };