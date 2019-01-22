import React from 'react';
import { get } from 'lodash';
import { render, cleanup, waitForElement, wait } from 'react-testing-library';
import { MockedProvider } from 'react-apollo/test-utils';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { mapProps, compose } from 'recompose';

import {
  whileLoading,
  forError,
  composeQuery,
  queryComposer,
  loading,
  error,
  progressMapper,
  errorMapper
} from '../src';

afterEach(cleanup);

/**
 * Test queries
 */
const TEST_QUERY = gql`
  query TestQuery{
    test{
      testField
      testField2
    }
  }
`;

const QUERY_ONE = gql`
query QueryOne($id: ID!) {
  test(id: $id){
    testField
    testField2
  }
}
`;

const QUERY_TWO = gql`
query QueryTwo($location: String!) {
  test(location: $location){
    testField
    testField2
  }
}
`;

/**
 * Test responses
 */
const testMocks = [{
  request: {
    query: QUERY_ONE,
    variables: { id: "1" },
  },
  result: {
    data: {
      test: {
        testField: 100,
        testField2: 100,
      }
    }
  },
  }, {
  request: {
    query: QUERY_TWO,
    variables: { location: "primary" },
  },
  result: {
    data: {
      test: {
        testField: 400,
        testField2: 400,
      }
    }
  },
}];

/**
 * Test component
 */
const testComponent = ({ children, message = "TestComponent"}) => (
  <div>
    {message}
    {children}
  </div>
);

it(`composes and renders a loading component with progress counter using 
  utilComposer and whileLoading`, () => {
  /**
   * Composes loading component with new view layer component
   * using instance of utilComposer assigned to loading.compose
   */
  const view = loading.compose({
    view: ({ icon, message, progress: { min, max, total }, ...rest }) => (
      <div data-testid="loading-component" {...rest}>
        <div data-testid="loading-icon">{icon}</div>
        <p data-testid="loading-message">
          {message}{' '}{Math.floor(total * 100 / max)}%
        </p>
      </div>
    ),
    mapper: progressMapper,
  });

  /**
   * Creates conditional function for loading to be called
   * @param {object} props - component props
   */
  const cond = props => !!get(props, 'data.loading');

  /**
   * Wraps test component in query layer and loading layer using whileLoading
   */
  const WrappedComponent = compose(
    graphql(TEST_QUERY),
    whileLoading({ view, cond }),
  )(testComponent);

  // Renders WrappedComponent
  const { getByTestId } = render(
    <MockedProvider mocks={[]} addTypename={false}>
      <WrappedComponent />
    </MockedProvider>
  )

  // Confirms container
  const container = getByTestId(/loading-component/);
  expect(container).toBeTruthy();

  // Confirms icon
  const icon = getByTestId(/loading-icon/);
  expect(icon).toBeTruthy();
  
  // Confirms message
  const message = getByTestId(/loading-message/);
  expect(message.innerHTML).toMatch(/^.+ ?\d+%$/);
});

it(`composes and renders a error component when specified prop is found
  using utilComposer`, async () => {
  /**
   * Mock error response for test query
   */
  const mocks = [{
    request: {
      query: TEST_QUERY,
    },
    error: new Error('its broke'),
  }];

  /**
   * Composes error component with new view layer component
   * using instance of utilComposer assigned to error.compose
   */
  const view = error.compose({
    view: ({ message }) => (<div data-testid="error-component">{message}</div>),
    mapper: errorMapper,
  });
  
  /**
   * Wraps test component in query layer and error-handling layer using forError
   */
  const WrappedComponent = compose(
    graphql(TEST_QUERY),
    forError({ view, type: 'query', errorProp: 'data.error.message' }),
  )(testComponent);

  // Renders WrappedComponent
  const { getByTestId } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <WrappedComponent />
    </MockedProvider>
  )

  // Confirms Container
  const component = await waitForElement(() => getByTestId(/error-component/));
  expect(component).toBeTruthy();

  // Confirms Message
  expect(component.innerHTML).toMatch(/its broke/);

});

it(`composes and renders an error when view layer component throws an error`, async () => {
  /**
   * Composes error component with new view layer component
   * using instance of utilComposer assigned to error.compose
   */
  const view = error.compose({
    view: ({ message }) => (<div data-testid="error-component">{message}</div>),
    mapper: errorMapper,
  });

  /**
   * Wraps test component in error-handling layer using forError
   */
  const WrappedComponent = forError({
    view,
  })(testComponent);

  /**
   * Throws an error upon mounting
   */
  const BrokeComponent = ({message}) => {
    throw new Error(message);
  };

  // Renders WrappedComponent
  const { getByText } = render(
    <WrappedComponent>
      <BrokeComponent message="It broke" />
    </WrappedComponent>
  );

  // Confirms error message
  await wait(() => expect(getByText(/It broke/)).toBeTruthy());
});

it(`composes and renders a component wrapped in multiple "graphql" HOCs when specified conditions are met`, async () => {


  const testComponent = ({ testField, testField2 }) => (
    <React.Fragment>
      <span data-testid="field-1">{testField}</span>
      <span data-testid="field-2">{testField2}</span>
    </React.Fragment>
  );

  const view = () => null;

  const QueryComponent = compose(
    composeQuery([
      {
        cond: ({ location }) => !!location,
        query: QUERY_TWO,
        config: { options: ({ location }) => ({ location }) },
      }, {
        cond: ({ id }) => !!id,
        query: QUERY_ONE,
        config: { options: ({ id }) => ({ id }) },
      }
    ]),
    whileLoading({ view }),
    mapProps(({data, ...rest}) => {
      const testField = get(data, 'test.testField');
      const testField2 = get(data, 'test.testField2');
      return { testField, testField2, ...rest}
    })
  )(testComponent);

  const { getByTestId, rerender } = render(
    <MockedProvider mocks={testMocks} addTypename={false}>
      <QueryComponent id="1" />
    </MockedProvider>
  );

  let fieldOne = await waitForElement(() => getByTestId(/field-1/));
  expect(fieldOne).toBeTruthy();
  expect(fieldOne.innerHTML).toMatch(/100/);

  let fieldTwo = await waitForElement(() => getByTestId(/field-2/));
  expect(fieldTwo).toBeTruthy();
  expect(fieldTwo.innerHTML).toMatch(/100/);

  rerender(
    <MockedProvider mocks={testMocks} addTypename={false}>
      <QueryComponent location="primary" />
    </MockedProvider>
  );

  fieldOne = await waitForElement(() => getByTestId(/field-1/));
  expect(fieldOne).toBeTruthy();
  expect(fieldOne.innerHTML).toMatch(/400/);

  fieldTwo = await waitForElement(() => getByTestId(/field-2/));
  expect(fieldTwo).toBeTruthy();
  expect(fieldTwo.innerHTML).toMatch(/400/);
});

it(`composes, maps, and render a component wrapped in conditional graphql HOCs
  using queryComposer`, async () => {
  /**
   * Composes loading component with new view layer component
   * using instance of utilComposer assigned to loading.compose
   */
  const loadingView = loading.compose({
    view: ({ icon, message, progress: { min, max, total }, ...rest }) => (
      <div data-testid="loading-component" {...rest}>
        <div data-testid="loading-icon">{icon}</div>
        <p data-testid="loading-message">
          {message}{' '}{Math.floor(total * 100 / max)}%
        </p>
      </div>
    ),
    mapper: progressMapper,
  });

  /**
   * Composes error component with new view layer component
   * using instance of utilComposer assigned to error.compose
   */
  const errorView = error.compose({
    view: ({ message }) => (<div data-testid="error-component">{message}</div>),
    mapper: errorMapper,
  });

  const composer = queryComposer({
    queries: [
      {
        cond: ({ location }) => !!location,
        query: QUERY_TWO,
        config: { options: ({ location }) => ({ location }) },
      }, {
        cond: ({ id }) => !!id,
        query: QUERY_ONE,
        config: { options: ({ id }) => ({ id }) },
      }
    ],
    whileLoading: { view: loadingView },
    forError: { view: errorView },
    sharedMapper: ({data, ...rest}) => {
      const testField = get(data, 'test.testField');
      const testField2 = get(data, 'test.testField2');
      return { testField, testField2, ...rest}
    },
    view: ({ testField, testField2 }) => (
      <React.Fragment>
        <span data-testid="field-1">{testField}</span>
        <span data-testid="field-2">{testField2}</span>
      </React.Fragment>
    ),
  });

  const ComposedComponent = composer({});

  // Renders ComposedComponent
  const { getByTestId, rerender } = render(
    <MockedProvider mocks={testMocks} addTypename={false}>
      <ComposedComponent id="1" />
    </MockedProvider>
  );

  // Confirms first field's value
  let fieldOne = await waitForElement(() => getByTestId(/field-1/));
  expect(fieldOne).toBeTruthy();
  expect(fieldOne.innerHTML).toMatch(/100/);

  // Confirms second field's value
  let fieldTwo = await waitForElement(() => getByTestId(/field-2/));
  expect(fieldTwo).toBeTruthy();
  expect(fieldTwo.innerHTML).toMatch(/100/);

  // Rerenders ComposedComponent
  rerender(
    <MockedProvider mocks={testMocks} addTypename={false}>
      <ComposedComponent location="primary" />
    </MockedProvider>
  );

  // Confirms first field's value
  fieldOne = await waitForElement(() => getByTestId(/field-1/));
  expect(fieldOne).toBeTruthy();
  expect(fieldOne.innerHTML).toMatch(/400/);

  // Confirms second field's value
  fieldTwo = await waitForElement(() => getByTestId(/field-2/));
  expect(fieldTwo).toBeTruthy();
  expect(fieldTwo.innerHTML).toMatch(/400/);
});