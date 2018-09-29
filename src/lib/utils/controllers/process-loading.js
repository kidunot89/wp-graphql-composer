import React from 'react'
import { get } from 'lodash';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { defaultProps } from 'recompose';

// Load icons to FontAwesome library
library.add(fas);

export const defaultIcon = (
  <div className="fa-layers">
    <FontAwesomeIcon size="2x" icon={['fas', 'circle']} />
    <FontAwesomeIcon size="2x" icon={['fas', 'circle-notch']} transform="shrink-1" color={'#B2F300'} spin />
  </div>
)

export default ({ data, icon: altIcon, message, ...rest }) => {
  const icon = (altIcon) ? altIcon : defaultIcon;

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