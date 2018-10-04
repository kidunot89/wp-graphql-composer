import React, { createFactory } from 'react';
import { omit } from 'lodash';
import { Switch, Route } from 'react-router-dom';

export default props => (BaseComponent) => {
  const BaseFactory = createFactory(BaseComponent);

  class ProcessRoutes extends React.Component {
    render() {
      
      return BaseFactory(
        this.props,
      );
    }
  }

  return ProcessRoutes;
}