import React from 'react'
import { get } from 'lodash';

import { Icon } from './icon';

export default ({ data, icon: altIcon, message, ...rest }) => {
  const icon = (altIcon) ? altIcon : <Icon name="autorenew" size="large" />;

  const total = get(data, 'networkStatus') || get(data, 'loading');
  if ( total ) {
    const min = 0;
    const max = 7;

    return {
      progress: { total, min, max },
      icon,
      message,
      ...rest,
    };
  }

  return { icon, message, ...rest };
}