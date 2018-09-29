import React, { createFactory } from 'react';
import { get, map } from 'lodash';
import { 
  branch, compose, renderComponent, mapProps,
  setDisplayName, wrapDisplayName,
} from 'recompose';
import { graphql } from 'react-apollo';

/**
 * HOCs for rendering a component when loading flag is found in props
 * maps loading progress props to provided component 
 * 
 * @param {React.Component} component - component to be rendered
 * @param {string} propName - name of prop holding loading flag
 * @param {object} loadingStatus - holds loading progress properties
 */
export const whileLoading = (component, propName = 'data.loading', message='Loading...') =>
  branch(
    props => !!get(props, propName),
    renderComponent(
      mapProps(props => ({ ...props, message }))(component)
    )
  );

/**
 * HOCs for catching errors in all components wrapped in it
 */
export const errorHandler = () => BaseComponent => {
  const BaseFactory = createFactory(BaseComponent);

  class ErrorHandler extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    componentDidCatch(error, errorInfo) {
      this.setState({ error: error.toString(), errorInfo: errorInfo.toString() })
    }

    render() {
      return BaseFactory({ ...this.props, ...this.state });
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(BaseComponent, 'errorHandler'))(ErrorHandler);
  }

  return ErrorHandler;
}

/**
 * HOCs for rendering a component when error flag/message is found in props
 * maps error message props to provided component
 * 
 * @param {React.Component} component - component to be rendered
 * @param {string} errorType - error type prop to be passed to component
 * @param {string} messagePropName - name of prop holding error message
 */
export const forError = (component, errorType, messagePropName = "data.error.message") =>
  compose(
    // Catch errors below
    errorHandler(),
    // Catch errors above
    branch(
      props => (!!get(props, messagePropName) || !!get(props, 'error')) && !props.fallback,
      renderComponent(
        compose(
          mapProps(props => {
            return {
              message: get(props, messagePropName) || get(props, 'error'),
              type: errorType,
            };
          })
        )(component)
      ),

    ),
    mapProps(({ error, errorInfo, ...rest }) => {
      return rest;
    }),
  );

  export const composeQuery = queries => 
    compose(...map(queries, ({ cond, query, config }) => 
      branch( props => cond(props), graphql(query, config))      
    ));