import { compose, mapProps } from 'recompose';
import { graphql } from 'react-apollo';


import { whileLoading, forError, Loading, Error } from 'lib';
import main from './views/main';
import { LOOP_QUERY } from './query';

main.compose = (template = main, error = Error, loading = Loading) =>
  compose(
    graphql(LOOP_QUERY),
    whileLoading(loading),
    forError(error),
    mapProps(
      ({ data, ...rest}) => rest,
    ),
  )(template);

const Main = main.compose();

export { Main, main, LOOP_QUERY };

