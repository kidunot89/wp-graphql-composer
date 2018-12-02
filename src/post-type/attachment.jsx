// attachment.jsx
/**
 * External dependencies
 */
import React from 'react'
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import { Error, Loading } from '../utils'; 
import { queryComposer } from '../composers';
import { CUSTOM_LOGO_QUERY, ATTACHMENT_QUERY } from './query';
import { customLogoMapper, attachmentMapper } from './attachment-mapper';

/**
 * SCSS Module
 */
import styles from './attachment.module.scss';

/**
 * Attachment view component
 * 
 * @param {object} props
 * 
 * @returns {React.Component} 
 */
const attachment = ({ src, className: added, alt, ...rest }) => {
  const className = classNames(
    styles.attachment,
    added,
  );

  return (src) ?
    (<img src={src} className={className} alt={alt} {...rest} />) :
    null;
}

attachment.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
};

attachment.defaultProps = {
  src: undefined,
  alt: 'image',
};

/**
 * Creates composer for attachment component
 */
attachment.compose = queryComposer({
  view: attachment,
  whileLoading: { view: Loading },
  forError: { view: Error, type: '404-image' },
  queries: [
    {
      query: CUSTOM_LOGO_QUERY,
      cond: ({ customLogo }) => !!customLogo,
      mapper: customLogoMapper,
    },
    {
      query: ATTACHMENT_QUERY,
      cond: ({ customLogo }) => !customLogo,
      mapper: attachmentMapper,
      config: {
        options: ({ id, mediaItemId, slug, uri }) => ({ id, mediaItemId, slug, uri }),
        skip: ({ id, mediaItemId, slug, uri }) => !id && !mediaItemId && !slug && !uri
      }
    },
  ],
});

/**
 * Compose default Attachment Component
 * @var {React.Component} Attachment
 */
const Attachment = attachment.compose();

export { attachment, Attachment };
