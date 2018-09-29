import { mapProps, compose } from 'recompose';

import loading from './views/loading';
import progressMapper from './controllers/process-loading';

import error from './views/error';
import errorMapper from './controllers/process-errors';

loading.compose = ( template = loading, mapper = progressMapper ) => 
  compose(
    mapProps(mapper)
  )(template);

const Loading = loading.compose();

error.compose = ( template = error, mapper = errorMapper) => 
  compose(
    mapProps(mapper)
  )(template);

const Error = error.compose();

export { Error, error, Loading, loading };