import { queryComposer } from '../composers';
import { Loading, Error } from '../utils';
import { Archive } from '../archives';
import { Page, Post } from '../post-type';

import main from './main';
import { mapLoopProps, defaultRoutes, routesProcessor } from './router';
import { LOOP_QUERY } from './query';

main.compose = queryComposer({
  view: main,
  Archive: Archive,
  Page: Page,
  Post: Post,
  queries: [{ query: LOOP_QUERY, mapper: mapLoopProps }],
  whileLoading: { view: Loading },
  forError: { view: Error },
  extraHocs: [routesProcessor(defaultRoutes)]
});

var Main = main.compose({});

export { Main, main, LOOP_QUERY, routesProcessor, defaultRoutes };