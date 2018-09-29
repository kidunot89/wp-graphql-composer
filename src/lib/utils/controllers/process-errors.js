import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'

// Load icons to FontAwesome library
library.add(fas);

export const processMessage = (defaultMessage, message) => {
  if(process.env.REACT_APP_DEBUG_MODE) return message || defaultMessage;
  return defaultMessage;
}

export default ({ type = '', message, ...rest }) => {    
  switch(type) {
    case '404':
    case '404-image':
      return { 
        message: processMessage(
          `Sorry, we can't locate the ${type === '404-image' ? 'image' : 'page'} you're looking for. Please, try again later.`,
          message,
        ),
        icon: (<FontAwesomeIcon color="Tomato" size="2x" icon={['fas', 'times']} mask={['fas', 'circle']}/>),
        ...rest
      };

    case '403':
      return { 
        message: processMessage(
          'Sorry, you aren\'t authorized to view this content.',
          message,
        ),
        icon: (<FontAwesomeIcon color="Tomato" size="2x" icon={['fas', 'ban']}/>),
        ...rest
      };

    case 'query':
      return { 
        message: processMessage(
          'Sorry, there was a problem loading the content you are trying to access. Please, try again later.',
          message,
        ),
        icon: (<FontAwesomeIcon color="Tomato" size="2x" icon={['fas', 'exclamation-circle']} />),
        ...rest
      };

    default:
      return { 
        message: processMessage(
          'Wow, this is embarassing! We\'re not sure what happened. Or... a lazy dev just forgot to add a message here. Sorry!.',
          message,
        ),
        icon: (<FontAwesomeIcon size="2x" icon={['fas', 'grin-beam-sweat']} />),
        ...rest
      };
  }
};