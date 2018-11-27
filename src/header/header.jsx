// header.jsx
/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * Internal dependencies
 */
import { queryComposer } from '../composers';
import { Error, Loading } from '../utils'
import { Attachment } from '../post-type'
import { headerMapper } from './header-mapper';
import { HEADER_QUERY } from './query';

/**
 * SCSS Module
 */
import './header.scss';

/**
 * Header view component
 * 
 * @param {object} props
 * 
 * @returns {React.Component} 
 */
const header = ({ url, title, description, logo, children, Attachment, ...rest }) => {
  return (
    <div className="site-header" role="banner" {...rest}>
      <div id="masthead" className="site-branding">
        <Attachment
          mediaItemId={logo}
          className="custom-logo"
          alt={title}
          fallback
          style={{
            width: '256px',
            padding: '2em',
          }}
        />
        <Link to="/" data-testid="home-link"><h1 className="site-title">{title}</h1></Link>
        <h1 className="site-description"><small>{description}</small></h1>
      </div>
      <div id="main-navigation" className="app-navigation">
        {children}
      </div>
    </div>
  )
}

header.propTypes = {
  Attachment: PropTypes.func.isRequired,
  url: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  logo: PropTypes.number,
};

header.defaultProps = {
  url :undefined,
  title: undefined,
  description: undefined,
  logo: undefined,
};

/**
 * Creates composer for header component
 */
header.compose = queryComposer({
  view: header,
  Attachment,
  whileLoading: { view: Loading },
  forError: { view: Error, type: 'query' },
  queries: [{ query: HEADER_QUERY }],
  sharedMapper: headerMapper,
});

/**
 * Compose default Header Component
 * @var {React.Component} Header
 */
const Header = header.compose();

export { header, Header };