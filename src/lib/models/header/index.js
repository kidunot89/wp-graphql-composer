import { queryComposer } from 'lib/composers';
import { Error, Loading } from 'lib/utils'

import header from './views/header';
import headerMapper from './controllers/header-mapper';
import { HEADER_QUERY } from './query';

header.compose = queryComposer({
  view: header,
  whileLoading: { view: Loading },
  forError: { view: Error, type: 'query' },
  queries: [{ query: HEADER_QUERY }],
  sharedMapper: headerMapper,
});

const Header = header.compose({});
export { Header, header, HEADER_QUERY };
