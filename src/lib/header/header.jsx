import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './header.scss';

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
}


export default header;