import { queryComposer } from '../composers';
import { Error, Loading } from '../utils'
import { Attachment } from '../post-type'

import header from './header';
import headerMapper from './header-mapper';
import { HEADER_QUERY } from './query';

header.compose = queryComposer({
  view: header,
  Attachment,
  whileLoading: { view: Loading },
  forError: { view: Error, type: 'query' },
  queries: [{ query: HEADER_QUERY }],
  sharedMapper: headerMapper,
});

const Header = header.compose({});
export { Header, header, HEADER_QUERY };
