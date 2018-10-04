import { utilComposer } from 'lib/composers';

import loading from './views/loading';
import progressMapper from './controllers/process-loading';

import error from './views/error';
import errorMapper from './controllers/process-errors';

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
export { Error, error, errorMapper, Loading, loading, progressMapper };