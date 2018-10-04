import React from 'react';
import { each, get, map } from 'lodash';
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
export const whileLoading = ({ view, cond = props => !!get(props, 'data.loading') }) =>
  branch(
    cond,
    renderComponent(view)
  );

/**
 * HOCs for catching errors in all child components
 */
export const errorHandler = BaseComponent => {
  const BaseFactory = React.createFactory(BaseComponent);

  class ErrorHandler extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    componentDidCatch(error, errorInfo) {
      this.setState({
        error: error.toString(),
        errorInfo: map(errorInfo, e => e.toString())
      })
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
export const forError = ({
  view,
  type: errorType,
  errorProp = "data.error.message",
  cond = props => (!!get(props, errorProp) || !!get(props, 'error'))
}) =>
  compose(
    // Catch errors below
    errorHandler,
    // Catch errors above
    branch(
      props => cond(props) && !props.fallback,
      renderComponent(
        compose(
          mapProps(props => {
            const type = errorType || 'system';
            const graphqlError = get(props, errorProp);
            if (graphqlError) {
              return { message: graphqlError, type };
            }

            const systemError = get(props, 'error');
            if (systemError) {
              let message = systemError;
              const errorInfo = props.errorInfo;
              if (Array.isArray(errorInfo)) {
                each(errorInfo, e => (message = `${message} ${e}`))
              } else if (errorInfo) {
                message = `${message} ${errorInfo}`;
              }
              return { message, type };
            }

            return { message: 'Unknown error', type: 'system' };
          })
        )(view)
      ),

    ),
    mapProps(({ error, errorInfo, ...rest }) => {
      return rest;
    }),
  );

/**
 * QueryCondition
 * @param {func} cond - condition function ex. (props) -> !!props.id
 * @param {gql} query - query to be request
 * @param {object} config - graphql(query, config)
 * @param {func} mapper - props mapper function
 */

/**
 * Return an instance of the `graphql` higher order component for 
 * the first QueryCondition to return true.  
 * @param {QueryCondition} queries 
 */
export const composeQuery = queries => 
  compose(
    ...map(
      queries, 
      ({
        query,
        config,
        cond = () => true
      }) => branch(
          props => cond(props),
          graphql(query, config),
        )      
    )
  );

/**
 * 
 * @param {React.Component} defaultView
 * @param {func} defaultMapper 
 */
export const utilComposer = ({
  defaultView, defaultMapper
}) => ({
    view = defaultView, 
    mapper = defaultMapper ,
  }) => compose(
    mapProps(mapper)
  )(view);

/**
 * Returns composer function that creates a component 
 * wrapped multiple components for handling rudimentary
 * Loading->Error->mapper(view)
 * 
 * @param {React.Component} view - default properties for view layer component
 * @param {object} whileLoading - default properties for loading component
 * @param {object} forError - default properties for error component
 * @param {func} mapper - default function for mapping props
 * @param {React.Component[]} extraHocs - default extra higher order components added before mapper
 * @param {*} extraDefaults - default extra props passed to the view layer component
 */
export const baseComposer = ({
  view: defaultView,
  whileLoading: defaultWhileLoading,
  forError: defaultForError,
  mapper: defaultMapper,
  extraHocs: defaultExtraHocs = [],
  ...extraDefaults
}) =>
  ({
    view = defaultView,
    loading = defaultWhileLoading,
    error = defaultForError,
    mapper = defaultMapper,
    extraHocs = defaultExtraHocs,
    ...rest,
  }) => compose(
    whileLoading(loading),
    forError(error),
    ...extraHocs,
    mapProps(props => ({ ...mapper(props), ...extraDefaults, ...rest })),
  )(view);

/**
 * Returns composer function that creates a component 
 * wrapped multiple components for handling rudimentary
 * and conditional graphql components
 * GraphQL->Loading->Error->queryMapper->defaultExtraHocs->ExtraHocs->sharedMapper(view)
 * 
 * @param {React.Component} view - default properties for view layer component
 * @param {object[]} queries - array of default properties of the GraphQL components
 * @param {object} whileLoading - default properties for loading component
 * @param {object} forError - default properties for error component
 * @param {func} mapper - default function for mapping props
 * @param {React.Component[]} extraHocs - default extra higher order components added before sharedMapper
 * @param {*} extraDefaults - default extra props passed to the view layer component
 */
export const queryComposer = ({
  view: defaultView,
  queries: defaultQueries,
  whileLoading: defaultWhileLoading,
  forError: defaultForError,
  sharedMapper: defaultSharedMapper = p => p,
  extraHocs: defaultExtraHocs = [],
  ...extraDefaults,
}) =>
  ({
    view = defaultView,
    queries = defaultQueries,
    loading = defaultWhileLoading,
    error = defaultForError,
    sharedMapper = defaultSharedMapper,
    extraHocs = defaultExtraHocs,
    ...rest,
  }) => compose(
    composeQuery(queries),
    whileLoading(loading),
    forError(error),
    ...map(
      queries, 
      ({ cond = () => true, mapper = p => p }) => 
        branch(
          props => cond(props),
          mapProps(mapper),
        ),
    ),
    ...extraHocs,
    mapProps(props => ({ ...sharedMapper(props), ...extraDefaults, ...rest })),
  )(view);