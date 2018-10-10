import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

export const Link = ({ url, children, ...rest }) => {
  if (url.startsWith('http')) return (
    <a href={url} {...rest}>
      {children}
    </a>
  );

  else return (
    <NavLink to={`/${url}`} {...rest}>
      {children}
    </NavLink>
  );
} 

const menuItem = ({
  url, label, items, description,
  cssClasses, SubMenu, MenuItem,
  ...rest
}) => (
  <React.Fragment>
    <Link {...{ ...rest, url }}>
      {label}
      {description &&
        <div className="menu-item-description">
          {description}
        </div>
      }
    </Link>
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
