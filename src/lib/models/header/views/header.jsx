import React from 'react';
import PropTypes from 'prop-types';
import { Attachment } from 'lib/models';

const header = ({ url, title, description, logo, children }) => {
  return (
    <div className="app-header">
      <div id="masthead" className="site-branding">
        <Attachment mediaItemId={logo} className="site-logo" alt="site logo" fallback />
        <a href={url} data-testid="home-link"><h1 className="site-title">{title}</h1></a>
        <h1 className="site-description"><small>{description}</small></h1>
      </div>
      <div id="main-navigation" className="app-navigation">
        {children}
      </div>
    </div>
  )
}

header.propTypes = {
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