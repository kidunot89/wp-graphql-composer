import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { render, cleanup, waitForElement } from 'react-testing-library';
import { MockedProvider } from 'react-apollo/test-utils';

import { PAGE_QUERY, PAGE_BY_QUERY, Page, page } from '../../src';

afterEach(cleanup);

it(`renders a page`, async () => {
  const mocks = [{
    request: {
      query: PAGE_QUERY,
      variables: { id: "W0T5R0x" },
    },
    result: {
      data: {
        page: {
          id: "W0T5R0x",
          uri: "test-page",
          pageId: 125,
          title: "Sample Page",
          content: "<h1>Hello World</h1>",
          modified: "2018-09-19 00:27:35",
          date: "2018-09-15 23:19:11"
        }
      }
    }
  }];
  const { getByTestId } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Page id="W0T5R0x" data-testid="test-page" />
    </MockedProvider>
  );
  
  const body = await waitForElement(() => getByTestId(/test-page/));
  expect(body).toBeTruthy();
});


it(`renders a page by uri`, async () => {
  const mocks = [{
    request: {
      query: PAGE_BY_QUERY,
      variables: {
        uri: "test-page",
        pageId: null,
      },
    },
    result: {
      data: {
        pageBy: {
          id: "W0T5R0x",
          uri: "test-page",
          pageId: 125,
          title: "Sample Page",
          content: "<h1>Hello World</h1>",
          modified: "2018-09-19 00:27:35",
          date: "2018-09-15 23:19:11"
        }
      }
    }
  }];
  const { getByTestId } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Page uri="test-page" data-testid="test-page" />
    </MockedProvider>
  );
  
  const body = await waitForElement(() => getByTestId(/test-page/));
  expect(body).toBeTruthy();
});


it(`render a page with a custom view component`, async () => {
  const CustomPage = page.compose({
    view: ({ pageId, title, content, date, modified, ...rest }) => (
      <div id={`page-${pageId}`} data-testid="page-body" {...rest}>
        <h1 data-testid="page-title">{title}</h1>
        <div data-testid="page-content">{ReactHtmlParser(content)}</div>
        <div>
          <span data-testid="page-date">{date}</span>
          <span data-testid="page-modified">{modified}</span>
        </div>
      </div>
    )
  });

  const mocks = [{
    request: {
      query: PAGE_BY_QUERY,
      variables: { 
        pageId: 544,
        uri: null,
      },
    },
    result: {
      data: {
        pageBy: {
          id: "W0T5R0x",
          uri: "test-page",
          pageId: 544,
          title: "Sample Page",
          content: "<h1>Hello World</h1>",
          modified: "2018-09-19 00:27:35",
          date: "2018-09-15 23:19:11"
        }
      }
    }
  }];
  const { getByTestId } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <CustomPage pageId={544} />
    </MockedProvider>
  );
  
  const body = await waitForElement(() => getByTestId(/page-body/));
  expect(body).toBeTruthy();

  const title = getByTestId(/page-title/);
  expect(title.innerHTML).toMatch(/Sample Page/);

  const content = getByTestId(/page-content/);
  expect(content.innerHTML).toMatch(/<h1>Hello World<\/h1>/);

  const date = getByTestId(/page-date/);
  expect(date.innerHTML).toMatch(/2018-09-15 23:19:11/);

  const modified = getByTestId(/page-modified/);
  expect(modified.innerHTML).toMatch(/2018-09-19 00:27:35/);
});


it(`renders page not found`, async () => {
  const mocks = [{
    request: {
      query: PAGE_QUERY,
      variables: { id: "W0T5R0x" },
    },
    result: {
      "errors": [
        {
          message: "The \"id\" is invalid",
          category: "user",
          locations: [
            {
              line: 2,
              column: 3
            }
          ],
          path: [
            "page"
          ]
        }
      ],
      data: {
        page: null
      }
    }
  }];
  const { getByTestId } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Page id="W0T5R0x" data-testid="test-page" />
    </MockedProvider>
  );
  
  const icon = await waitForElement(() => getByTestId(/error-icon/));
  expect(icon).toBeTruthy();
  expect(icon.innerHTML === '').toBeFalsy();
  const message = getByTestId(/error-message/);
  expect(message).toBeTruthy()
  expect(message.innerHTML).toMatch(
    /^Sorry, we can't locate the page you're looking for. Please, try again later.$|^GraphQL error: The \"id\" is invalid$/
  );
});


it(`renders a loading state`, () => {
  const { getByText, getByTestId } = render(
    <MockedProvider mocks={[]} addTypename={false}>
      <Page uri="sample-page" />
    </MockedProvider>,
  );

  const icon = getByTestId(/loading-icon/);
  expect(icon).toBeTruthy();
  expect(icon.innerHTML === '').toBeFalsy();
  expect(getByText(/Loading\.\.\./)).toBeTruthy();
});


it(`renders error state`, async () => {
  const mocks = [{
    request: {
      query: PAGE_BY_QUERY,
      variables: { uri: "sample-page" },
    },
    error: new Error('its broke'),
  }];

  const { getByTestId } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Page uri="sample-page" />
    </MockedProvider>,
  );

  const icon = await waitForElement(() => getByTestId(/error-icon/));
  expect(icon).toBeTruthy();
  expect(icon.innerHTML === '').toBeFalsy();
  const message = getByTestId(/error-message/);
  expect(message).toBeTruthy()
  expect(message.innerHTML === '').toBeFalsy();
});