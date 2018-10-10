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
  const notFound = /^404(?:-(.*))?$/;
  const notAuthorized = /^403(?:-(.*))?$/;
  const queryError = /^query(?:-(.*))?$/;
  const systemError = /^component(?:-(.*))?$/;
  let typename;
  switch(true) {
    case notFound.test(type):
      typename = (type.replace(notFound, '$1') !== '') ? type.replace(notFound, '$1') : 'content';
      return { 
        message: processMessage(
          `Sorry, we can't locate the ${typename} you're looking for. Please, try again later.`,
          message,
        ),
        icon: (<FontAwesomeIcon color="Tomato" size="2x" icon={['fas', 'times']} mask={['fas', 'circle']}/>),
        type,
        ...rest
      };

    case notAuthorized.test(type):
      typename = (type.replace(notAuthorized, '$1') !== '') ? type.replace(notAuthorized, '$1') : 'content';
      return { 
        message: processMessage(
          `Sorry, you aren't authorized to view this ${typename}.`,
          message,
        ),
        icon: (<FontAwesomeIcon color="Tomato" size="2x" icon={['fas', 'ban']}/>),
        type,
        ...rest
      };

    case queryError.test(type):
      typename = (type.replace(queryError, '$1') !== '') ? type.replace(queryError, '$1') : 'content';
      return { 
        message: processMessage(
          `Sorry, there was a problem loading the ${typename} you are trying to access. Please, try again later.`,
          message,
        ),
        icon: (<FontAwesomeIcon color="Tomato" size="2x" icon={['fas', 'exclamation-circle']} />),
        type,
        ...rest
      };

    case systemError.test(type):
      typename = (type.replace(systemError, '$1') !== '') ? type.replace(systemError, '$1') : 'content';
      return { 
        message: processMessage(
          `Sorry, there was a system error while loading the ${typename} you request. Please, try again later or report this to us.`,
          message,
        ),
        icon: (<FontAwesomeIcon color="Tomato" size="2x" icon={['fas', 'exclamation-triangle']} />),
        type,
        ...rest
      };

    default:
      return { 
        message: processMessage(
          'Wow, this is embarassing! We\'re not sure what happened. Or... a lazy dev just forgot to add a message here. Sorry!.',
          message,
        ),
        icon: (<FontAwesomeIcon size="2x" icon={['fas', 'grin-beam-sweat']} />),
        type,
        ...rest
      };
  }
};