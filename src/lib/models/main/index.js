import { queryComposer } from 'lib/composers';
import { Loading, Error } from 'lib/utils';
import { Archive } from 'lib/models/archives';
import { Page, Post } from 'lib/models/post-type';

import main from './views/main';
import { mapLoopProps, defaultRoutes, routesProcessor } from './controllers/router' 
import { LOOP_QUERY } from './query';

main.compose = queryComposer({
  view: main,
  Archive,
  Page,
  Post,
  queries: [{ query: LOOP_QUERY, mapper: mapLoopProps }],
  whileLoading: { view: Loading },
  forError: { view: Error },
  extraHocs: [routesProcessor(defaultRoutes)],
});

const Main = main.compose({});

export { Main, main, LOOP_QUERY };

