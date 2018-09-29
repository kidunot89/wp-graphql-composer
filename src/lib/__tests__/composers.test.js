import React from 'react';
import { get } from 'lodash';
import { render, cleanup, waitForElement, wait } from 'react-testing-library';
import { MockedProvider } from 'react-apollo/test-utils';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { mapProps, compose } from 'recompose';

import { whileLoading, forError, composeQuery, loading } from 'lib';

afterEach(cleanup);

const TEST_QUERY = gql`
  query TestQuery{
    test{
      testField
      testField2
    }
  }
`;

it(`composes and renders a loading component with progress counter`, () => {
  const testComponent = () => (<div>TestComponent</div>)
  const loadingComponent = loading.compose(
    ({ icon, message, progress: { min, max, total }, ...rest }) => (
      <div data-testid="loading-component" {...rest}>
        <div data-testid="loading-icon">{icon}</div>
        <p data-testid="loading-message">
          {message}{' '}{Math.floor(total * 100 / max)}%
        </p>
      </div>
    )
  );
  const Loading = graphql(TEST_QUERY)(whileLoading(loadingComponent, 'data.loading', 'Loading...')(testComponent));

  const { getByTestId } = render(
    <MockedProvider mocks={[]} addTypename={false}>
      <Loading />
    </MockedProvider>
  )

  const container = getByTestId(/loading-component/);
  expect(container).toBeTruthy();

  const icon = getByTestId(/loading-icon/);
  expect(icon).toBeTruthy();
  
  const message = getByTestId(/loading-message/);
  expect(message.innerHTML).toMatch(/^.+ ?\d+%$/);
});

it(`composes and renders a error component when specified prop is found`, async () => {
  const mocks = [{
    request: {
      query: TEST_QUERY,
    },
    error: new Error('its broke'),
  }];

  const testComponent = () => (<div>TestComponent</div>)
  const errorComponent = ({ message }) => (<div data-testid="error-component">{message}</div>);
  const Err = graphql(TEST_QUERY)(forError(errorComponent, 'query', 'data.error.message')(testComponent));

  const { getByTestId } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Err />
    </MockedProvider>
  )

  const component = await waitForElement(() => getByTestId(/error-component/));
  expect(component).toBeTruthy();
  expect(component.innerHTML).toMatch(/its broke/);

});

it(`composes and renders an error when a wrapped component throws an error`, async () => {
  const testComponent = ({ err }) => {
    return(<div>Hello</div>)
  }
  const errorComponent = ({ message }) => (<div data-testid="error-component">{message}</div>);
  const Err = forError(errorComponent)(testComponent);

  const { getByText } = render(<Err error="It broke" />);
  expect(getByText(/It broke/)).toBeTruthy();
})

it(`composes and renders a component wrapped in multiple "graphql" HOCs when specified conditions are met`, async () => {
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

  const mocks = [{
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

  const testComponent = ({ testField, testField2 }) => (
    <React.Fragment>
      <span data-testid="field-1">{testField}</span>
      <span data-testid="field-2">{testField2}</span>
    </React.Fragment>
  );

  const loadingComponent = () => null;

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
    whileLoading(loadingComponent, 'data.loading'),
    mapProps(({data, ...rest}) => {
      const testField = get(data, 'test.testField');
      const testField2 = get(data, 'test.testField2');
      return { testField, testField2, ...rest}
    })
  )(testComponent);

  const { getByTestId, rerender } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <QueryComponent id="1" />
    </MockedProvider>
  )

  let fieldOne = await waitForElement(() => getByTestId(/field-1/));
  expect(fieldOne).toBeTruthy();
  expect(fieldOne.innerHTML).toMatch(/100/);

  let fieldTwo = await waitForElement(() => getByTestId(/field-2/));
  expect(fieldTwo).toBeTruthy();
  expect(fieldTwo.innerHTML).toMatch(/100/);

  rerender(
    <MockedProvider mocks={mocks} addTypename={false}>
      <QueryComponent location="primary" />
    </MockedProvider>
  )

  fieldOne = await waitForElement(() => getByTestId(/field-1/));
  expect(fieldOne).toBeTruthy();
  expect(fieldOne.innerHTML).toMatch(/400/);

  fieldTwo = await waitForElement(() => getByTestId(/field-2/));
  expect(fieldTwo).toBeTruthy();
  expect(fieldTwo.innerHTML).toMatch(/400/);
})