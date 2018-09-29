import { mapProps, compose } from 'recompose';

import loading from './views/loading';
import progressMapper from './controllers/process-loading';

import error from './views/error';
import errorMapper from './controllers/process-errors';

loading.compose = function () {
  var template = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : loading;
  var mapper = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : progressMapper;
  return compose(mapProps(mapper))(template);
};

var Loading = loading.compose();

error.compose = function () {
  var template = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : error;
  var mapper = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : errorMapper;
  return compose(mapProps(mapper))(template);
};

var Error = error.compose();

export { Error, error, Loading, loading };