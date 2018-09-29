import { get } from 'lodash';
import { compose, mapProps } from 'recompose';
import { graphql } from 'react-apollo';
import { whileLoading, forError, Error, Loading } from 'lib';

import header from './views/header';
import { HEADER_QUERY } from './query';

header.compose = (template = header, loading = Loading, error = Error) => compose(
  graphql(HEADER_QUERY),
  whileLoading(loading),
  forError(error, 'query'),
  mapProps(({ data, ...rest }) => {
    const title = get(data, 'allSettings.generalSettingsTitle');
    const description = get(data, 'allSettings.generalSettingsDescription');
    const url = get(data, 'allSettings.homeUrl');
    const logo = get(data, 'themeMods.customLogo');
    
    return {
      title, url, description, logo,
      ...rest,
    }
  }),
  )(template)

const Header = header.compose();

export { Header, header, HEADER_QUERY };
