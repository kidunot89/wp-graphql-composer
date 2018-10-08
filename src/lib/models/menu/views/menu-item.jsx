import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

const menuItem = ({ url, label, items, subMenuView: SubMenu, ...rest }) => (
  <React.Fragment>
    <a href={url} {...rest}>{label}</a>
    {!isEmpty(items) && (<SubMenu className="composer-submenu" items={items} />)}
  </React.Fragment>
);

menuItem.propTypes = {
  url: PropTypes.string,
  label: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({})),
  subMenuView: PropTypes.func,
};

menuItem.defaultProps = {
  url: undefined,
  label: undefined,
  items: [],
  subMenuView: () => null,
};

export default menuItem;
