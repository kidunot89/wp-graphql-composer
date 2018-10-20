import _objectWithoutProperties from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties";
import React from 'react';
import { Link } from 'react-router-dom';
import './header.scss';

var header = function header(_ref) {
  var url = _ref.url,
      title = _ref.title,
      description = _ref.description,
      logo = _ref.logo,
      children = _ref.children,
      Attachment = _ref.Attachment,
      rest = _objectWithoutProperties(_ref, ["url", "title", "description", "logo", "children", "Attachment"]);

  return React.createElement("div", Object.assign({
    className: "site-header",
    role: "banner"
  }, rest), React.createElement("div", {
    id: "masthead",
    className: "site-branding"
  }, React.createElement(Attachment, {
    mediaItemId: logo,
    className: "custom-logo",
    alt: title,
    fallback: true,
    style: {
      width: '256px',
      padding: '2em'
    }
  }), React.createElement(Link, {
    to: "/",
    "data-testid": "home-link"
  }, React.createElement("h1", {
    className: "site-title"
  }, title)), React.createElement("h1", {
    className: "site-description"
  }, React.createElement("small", null, description))), React.createElement("div", {
    id: "main-navigation",
    className: "app-navigation"
  }, children));
};

header.defaultProps = {
  url: undefined,
  title: undefined,
  description: undefined,
  logo: undefined
};
export default header;