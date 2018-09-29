import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

const menuItem = ({ url, label, items, SubMenu, ...rest }) => (
  <React.Fragment>
    <a href={url} {...rest}>{label}</a>
    {!isEmpty(items) && (<SubMenu className="sub-menu" items={items} />)}
  </React.Fragment>
);

menuItem.propTypes = {
  url: PropTypes.string,
  label: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({})),
  SubMenu: PropTypes.func,
};

menuItem.defaultProps = {
  url: undefined,
  label: undefined,
  items: [],
  SubMenu: () => null,
};

export default menuItem;
