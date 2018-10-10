import { utilComposer } from '../composers';

import loading from './loading';
import progressMapper from './process-loading';

import error from './error';
import errorMapper from './process-errors';

/**
 * Creates composer for loading component
 */
loading.compose = utilComposer({ defaultView: loading, defaultMapper: progressMapper }); 

/**
 * Composes default Loading component
 */
const Loading = loading.compose({});

/**
 * Creates composer for loading component
 */
error.compose = utilComposer({ defaultView: error, defaultMapper: errorMapper });

/**
 * Composes default Error component
 */
const Error = error.compose({});

/**
 * Exports
 */
export {
  Error, error, errorMapper, Loading,
  loading, progressMapper,
};