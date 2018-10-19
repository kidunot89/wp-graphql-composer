import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { MenuContext } from './context';

export const Link = ({ url, children, homeUrl, ...rest }) => {
  if (!url || url === '#') return (
    <span className="menu-item-text">
      {children}
    </span>
  );

  if (url.startsWith(homeUrl)) return (
    <NavLink exact to={`${url.substring(homeUrl.length)}`} {...rest}>
      {children}
    </NavLink>
  );

  return (
    <a href={url} {...rest}>
      {children}
    </a>
  );
} 

const menuItem = ({
  url, label, items, description,
  cssClasses, SubMenu, MenuItem,
  ...rest
}) => (
  <React.Fragment>
    <MenuContext.Consumer>
      {({ homeUrl }) => (
        <Link {...{ ...rest, url, homeUrl }}>
          {label}
          {description &&
            <div className="menu-item-description">
              {description}
            </div>
          }
        </Link>
      )}
    </MenuContext.Consumer>
    {!isEmpty(items) && <SubMenu {...{ items, SubMenu, MenuItem }} />}
  </React.Fragment>
);

menuItem.propTypes = {
  SubMenu: PropTypes.func.isRequired,
  MenuItem: PropTypes.func.isRequired,
  url: PropTypes.string,
  label: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({})),
};

menuItem.defaultProps = {
  url: undefined,
  label: undefined,
  items: [],
};

export default menuItem;
