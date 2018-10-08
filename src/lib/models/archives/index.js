/**
 * 
 */
import { queryComposer } from 'lib/composers';
import { Error, Loading } from 'lib/utils';
import { archiveMapper } from './controllers/archive-mapper';
import archive from './views/archive';
import postResult from './views/post-result';
import { ARCHIVE_QUERY } from './query'

/**
 * Default where args for ARCHIVE_QUERY
 */
const whereArgsDefaults = {
  category: null,
  tag: null,
  month: null,
  year: null,
  author: null,
  search: null,
};

archive.compose = queryComposer({
  view: archive,
  postResultView: postResult,
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