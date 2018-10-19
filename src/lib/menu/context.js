import React from 'react';

export const menuInitialState = {
  homeUrl: '',
};
export const MenuContext = React.createContext(
  menuInitialState
);