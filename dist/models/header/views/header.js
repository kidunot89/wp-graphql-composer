function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';
import { Attachment } from 'lib/models';

var header = function header(_ref) {
  var url = _ref.url,
      title = _ref.title,
      description = _ref.description,
      logo = _ref.logo,
      children = _ref.children,
      rest = _objectWithoutProperties(_ref, ['url', 'title', 'description', 'logo', 'children']);

  return React.createElement(
    'div',
    Object.assign({ className: 'app-header' }, rest),
    React.createElement(
      'div',
      { id: 'masthead', className: 'site-branding' },
      React.createElement(Attachment, {
        mediaItemId: logo,
        className: 'site-logo',
        alt: 'site logo',
        fallback: true,
        style: {
          width: '256px',
          padding: '2em'

        }
      }),
      React.createElement(
        'a',
        { href: url, 'data-testid': 'home-link' },
        React.createElement(
          'h1',
          { className: 'site-title' },
          title
        )
      ),
      React.createElement(
        'h1',
        { className: 'site-description' },
        React.createElement(
          'small',
          null,
          description
        )
      )
    ),
    React.createElement(
      'div',
      { id: 'main-navigation', className: 'app-navigation' },
      children
    )
  );
};

header.propTypes = {
  url: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  logo: PropTypes.number
};

header.defaultProps = {
  url: undefined,
  title: undefined,
  description: undefined,
  logo: undefined
};

export default header;